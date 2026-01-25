import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import { eq } from 'drizzle-orm';
import { Env, getEnv } from '~/shared/lib/env';
import { createTransactionLog } from '~/feature/transaction/action';
import { generateSignature } from '~/shared/lib/doku';
import { sendEmail } from '~/shared/lib/resend';
import { paymentLinkSuccessTemplate } from '~/shared/template/payment-success.template';
import { getRegistrationConfig } from '~/feature/registration-config/action';

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

  const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);

  if (!transaction) {
    const errorPayload = { message: 'transaction not found' } as const;
    await createTransactionLog({
      transactionId: id,
      type: 'callback_response',
      payload: errorPayload,
    });

    return NextResponse.json(errorPayload, { status: 404 });
  }

  const previousPaymentStatus = transaction.paymentStatus;

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

  const shouldSendPaymentSuccessEmail = paymentStatus === 'paid' && previousPaymentStatus !== 'paid';
  if (shouldSendPaymentSuccessEmail) {
    const registrationConfig = await getRegistrationConfig();

    await sendEmail({
      to: transaction.email,
      subject: 'Pembayaran Berhasil',
      html: paymentLinkSuccessTemplate({
        fullName: transaction.fullName,
        totalAmount: transaction.amount,
        createdAt: transaction.createdAt,
        whatsappGroup: registrationConfig.whatsappGroupLink,
      }),
    });
  }

  return NextResponse.json(payload, { status: 200 });
}
