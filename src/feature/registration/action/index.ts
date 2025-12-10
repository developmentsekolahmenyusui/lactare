'use server';

import { ulid } from 'ulid';
import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import { generateSignature } from '~/shared/lib/doku';
import { getEnv } from '~/shared/lib/env';
import { redirect } from 'next/navigation';

const REGISTRATION_FEE = 169_000;

export async function createTransactionAction(values: RegistrationSchemaType) {
  const payload = RegistrationSchema.parse(values);

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
      amount: REGISTRATION_FEE,
    })
    .returning();

  const invoiceNumber = `INV-${transaction.id}`;

  const body = JSON.stringify({
    order: {
      amount: REGISTRATION_FEE,
      currency: 'IDR',
      invoice_number: invoiceNumber,
    },
    payment: {
      payment_due_date: 10,
    },
    customer: {
      name: transaction.fullName,
      email: transaction.email,
      phone: transaction.phoneNumber,
    },
  });

  const requestId = ulid();
  const timestamp = new Date().toISOString().slice(0, 19) + 'Z';
  const target = '/checkout/v1/payment';

  const signature = generateSignature({
    body,
    requestId,
    timestamp,
    target,
  });

  const res = await fetch(`${getEnv('DOKU_BASE_URL')}${target}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': getEnv('DOKU_CLIENT_ID'),
      'Request-Id': requestId,
      'Request-Timestamp': timestamp,
      Signature: signature,
    },
    body,
  });
  if (!res.ok) {
    console.error('DOKU Error Response:', await res.text());
    throw new Error('Failed to create DOKU payment');
  }

  const parsed = await res.json();
  const paymentUrl = parsed?.response?.payment?.url;
  if (!paymentUrl) {
    throw new Error('DOKU response missing payment URL');
  }

  redirect(paymentUrl);
}
