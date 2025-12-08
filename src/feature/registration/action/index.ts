'use server';

import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';

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

  return transaction;
}
