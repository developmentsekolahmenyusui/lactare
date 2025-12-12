'use server'

import { db } from '~/shared/db';
import { RegistrationConfig, registrationConfigs } from '~/shared/db/schema';

export async function getRegistrationConfig(): Promise<RegistrationConfig> {
  const [config] = await db.select().from(registrationConfigs).limit(1);

  if (!config) {
    throw new Error('Registration config is not set.');
  }

  return config;
}
