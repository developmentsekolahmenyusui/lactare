import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { getEnv } from '~/shared/lib/env';
import { createTransactionLog } from '~/feature/transaction/action';

export async function POST(req: NextRequest) {
  const secretKey = getEnv('DOKU_SECRET_KEY');

  const rawBody = await req.text();
  const headers = req.headers;

  const clientId = headers.get('client-id') ?? '';
  const requestId = headers.get('request-id') ?? '';
  const timestamp = headers.get('request-timestamp') ?? '';
  const signature = headers.get('signature') ?? '';
  const target = '/api/payment/callback';

  const digest = crypto.createHash('sha256').update(rawBody).digest('base64');

  const components =
    `Client-Id:${clientId}\n` +
    `Request-Id:${requestId}\n` +
    `Request-Timestamp:${timestamp}\n` +
    `Request-Target:${target}\n` +
    `Digest:${digest}`;

  const expectedSignature = 'HMACSHA256=' + crypto.createHmac('sha256', secretKey).update(components).digest('base64');

  const signatureValid = signature === expectedSignature;

  if (!signatureValid) {
    console.error('Invalid DOKU signature');
    return NextResponse.json({ message: 'invalid signature' }, { status: 401 });
  }

  let body: any;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'invalid json' }, { status: 400 });
  }

  const invoiceNumber: string = body?.order?.invoice_number;
  const status: string = body?.transaction?.status;

  if (!invoiceNumber || !status) {
    return NextResponse.json({ message: 'missing fields' }, { status: 400 });
  }
  const id = invoiceNumber.replace('INV-', '');

  await createTransactionLog({
    transactionId: id,
    type: 'callback_request',
    payload: {
      headers: {
        clientId,
        requestId,
        timestamp,
      },
      body,
    },
  });

  let paymentStatus: 'paid' | 'failed' | 'expired' = 'failed';

  if (status === 'SUCCESS') paymentStatus = 'paid';
  else if (status === 'EXPIRED') paymentStatus = 'expired';

  await db
    .update(transactions)
    .set({
      paymentStatus,
      paymentAt: paymentStatus === 'paid' ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id));

  const responsePayload = { message: 'ok' };

  await createTransactionLog({
    transactionId: id,
    type: 'callback_response',
    payload: responsePayload,
  });

  return NextResponse.json(responsePayload, { status: 200 });
}
