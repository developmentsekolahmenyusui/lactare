import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import { eq } from 'drizzle-orm';
import { Env, getEnv } from '~/shared/lib/env';
import { createTransactionLog } from '~/feature/transaction/action';
import { generateSignature } from '~/shared/lib/doku';

export async function POST(req: NextRequest) {
  const secretKey = getEnv(Env.DOKU_SECRET_KEY);

  const raw = await req.text();
  const headers = req.headers;

  const clientId = headers.get('client-id') ?? '';
  const requestId = headers.get('request-id') ?? '';
  const timestamp = headers.get('request-timestamp') ?? '';
  const signature = headers.get('signature') ?? '';
  const target = '/api/payment/callback';

  const expectedSignature = generateSignature({
    body: raw,
    requestId,
    timestamp,
    target,
    clientId,
    secretKey,
  });
  const isValid = signature === expectedSignature;
  if (!isValid) {
    console.error('Invalid DOKU signature');
    return NextResponse.json({ message: 'invalid signature' }, { status: 401 });
  }

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ message: 'invalid json' }, { status: 400 });
  }

  const invoice: string = body?.order?.invoice_number;
  const status: string = body?.transaction?.status;
  if (!invoice || !status) {
    return NextResponse.json({ message: 'missing fields' }, { status: 400 });
  }

  const id = invoice.replace('INV-', '');

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

  const statusMap: Record<string, 'paid' | 'failed' | 'expired'> = {
    SUCCESS: 'paid',
    EXPIRED: 'expired',
  };
  const paymentStatus: 'paid' | 'failed' | 'expired' = statusMap[status] ?? 'failed';

  await db
    .update(transactions)
    .set({
      paymentStatus,
      paymentAt: paymentStatus === 'paid' ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id));

  const payload = { message: 'ok' };

  await createTransactionLog({
    transactionId: id,
    type: 'callback_response',
    payload: payload,
  });

  return NextResponse.json(payload, { status: 200 });
}
