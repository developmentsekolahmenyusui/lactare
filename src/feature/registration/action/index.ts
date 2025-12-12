'use server';

import { ulid } from 'ulid';
import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import { createTransactionLog } from '~/feature/transaction/action';
import { generateSignature } from '~/shared/lib/doku';
import { getEnv } from '~/shared/lib/env';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { getRegistrationConfig } from '~/feature/registration-confiig/action';

export async function createTransactionAction(values: RegistrationSchemaType) {
  const payload = RegistrationSchema.parse(values);
  const registrationConfig = await getRegistrationConfig();
  const registrationFee = registrationConfig.price;

  const [transaction] = await db
    .insert(transactions)
    .values({
      fullName: payload.fullName,
      certificateName: payload.certificateName,
      email: payload.email,
      phoneNumber: String(payload.phoneNumber),
      lastEducation: payload.lastEducation,
      motherAge: payload.motherAge,
      pregnancyAge: payload.pregnancyAge ?? null,
      childAge: payload.childAge ?? null,
      address: payload.address,
      amount: registrationFee,
    })
    .returning();

  const invoiceNumber = `INV-${transaction.id}`;

  const dokuPayload = {
    order: {
      amount: registrationFee,
      currency: 'IDR',
      invoice_number: invoiceNumber,
    },
    payment: {
      payment_due_date: 60,
      payment_method_types: [
        'VIRTUAL_ACCOUNT_BANK_MANDIRI',
        'VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI',
        'VIRTUAL_ACCOUNT_BRI',
        'VIRTUAL_ACCOUNT_BNI',
        'VIRTUAL_ACCOUNT_DOKU',
        'VIRTUAL_ACCOUNT_BANK_PERMATA',
        'VIRTUAL_ACCOUNT_BANK_CIMB',
        'VIRTUAL_ACCOUNT_BANK_DANAMON',
        'VIRTUAL_ACCOUNT_BTN',
        'VIRTUAL_ACCOUNT_BNC',
        'QRIS',
      ],
    },
    customer: {
      name: transaction.fullName,
      email: transaction.email,
      phone: transaction.phoneNumber,
    },
  };

  const body = JSON.stringify(dokuPayload);

  const requestId = ulid();
  const timestamp = new Date().toISOString().slice(0, 19) + 'Z';
  const target = '/checkout/v1/payment';
  const clientId = getEnv('DOKU_CLIENT_ID');
  const secretKey = getEnv('DOKU_SECRET_KEY');

  const signature = generateSignature({
    body,
    requestId,
    timestamp,
    target,
    clientId,
    secretKey,
  });

  await createTransactionLog({
    transactionId: transaction.id,
    type: 'payment_request',
    payload: {
      target,
      requestId,
      timestamp,
      payload: dokuPayload,
    },
  });

  const res = await fetch(`${getEnv('DOKU_BASE_URL')}${target}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': clientId,
      'Request-Id': requestId,
      'Request-Timestamp': timestamp,
      Signature: signature,
    },
    body,
  });

  const responseText = await res.text();
  let responsePayload: unknown;
  try {
    responsePayload = JSON.parse(responseText);
  } catch {
    responsePayload = responseText;
  }

  await createTransactionLog({
    transactionId: transaction.id,
    type: res.ok ? 'payment_response' : 'payment_response_error',
    payload: {
      status: res.status,
      payload: responsePayload,
    },
  });

  if (!res.ok) {
    console.error('DOKU Error Response:', responseText);
    throw new Error('Failed to create DOKU payment');
  }

  if (typeof responsePayload !== 'object' || responsePayload === null) {
    throw new Error('Invalid DOKU response format');
  }

  const paymentLink = (responsePayload as any)?.response?.payment?.url;
  if (!paymentLink) {
    throw new Error('DOKU response missing payment URL');
  }

  await db.update(transactions).set({ paymentLink: paymentLink }).where(eq(transactions.id, transaction.id));

  redirect(paymentLink);
}
