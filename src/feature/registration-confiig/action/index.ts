'use server';

import { eq } from 'drizzle-orm';
import { db } from '~/shared/db';
import { RegistrationConfig, registrationConfigs } from '~/shared/db/schema';
import { RegistrationConfigFormSchema, RegistrationConfigFormValues } from '../schema';

export async function getRegistrationConfig(): Promise<RegistrationConfig> {
  const [config] = await db.select().from(registrationConfigs).limit(1);

  if (!config) {
    throw new Error('Registration config is not set.');
  }

  return config;
}

function normalizeConfigPayload(values: RegistrationConfigFormValues) {
  return {
    batchTitle: values.batchTitle.trim(),
    price: values.price,
    whatsappLink: values.whatsappLink.trim(),
    benefits: values.benefits.map((benefit) => benefit.value.trim()).filter(Boolean),
    isFormOpen: values.isFormOpen,
  } satisfies Omit<RegistrationConfig, 'id' | 'createdAt' | 'updatedAt'>;
}

export async function saveRegistrationConfig(values: RegistrationConfigFormValues): Promise<RegistrationConfig> {
  const payload = RegistrationConfigFormSchema.parse(values);
  const data = normalizeConfigPayload(payload);
  const now = new Date();

  if (payload.id) {
    const [updated] = await db
      .update(registrationConfigs)
      .set({ ...data, updatedAt: now })
      .where(eq(registrationConfigs.id, payload.id))
      .returning();

    if (!updated) {
      throw new Error('Konfigurasi tidak ditemukan');
    }

    return updated;
  }

  const [created] = await db
    .insert(registrationConfigs)
    .values({ ...data, updatedAt: now })
    .returning();

  return created;
}
