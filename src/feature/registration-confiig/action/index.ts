'use server';

import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~/shared/db';
import { RegistrationConfig, registrationConfigs } from '~/shared/db/schema';
import { RegistrationConfigFormSchema, RegistrationConfigFormValues } from '../schema';

function normalizeConfigPayload(values: RegistrationConfigFormValues) {
  return {
    batchTitle: values.batchTitle.trim(),
    price: values.price,
    whatsappLink: values.whatsappLink.trim(),
    isFormOpen: values.isFormOpen,
  } satisfies Omit<RegistrationConfig, 'id' | 'createdAt' | 'updatedAt'>;
}

export async function getRegistrationConfigs(): Promise<RegistrationConfig[]> {
  return await db.select().from(registrationConfigs).orderBy(desc(registrationConfigs.createdAt));
}

export async function getLatestRegistrationConfig(): Promise<RegistrationConfig | null> {
  const [config] = await db.select().from(registrationConfigs).orderBy(desc(registrationConfigs.createdAt)).limit(1);
  return config ?? null;
}

export async function getRegistrationConfigById(id: string): Promise<RegistrationConfig | null> {
  const [config] = await db.select().from(registrationConfigs).where(eq(registrationConfigs.id, id)).limit(1);
  return config ?? null;
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
