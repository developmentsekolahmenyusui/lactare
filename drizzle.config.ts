import { defineConfig } from 'drizzle-kit';
import { Env, getEnv } from '~/shared/lib/env';

export default defineConfig({
  schema: './src/shared/db/schema/index.ts',
  dialect: 'postgresql',
  migrations: {
    prefix: 'timestamp',
    table: 'migration_versions',
    schema: 'public',
  },
  dbCredentials: {
    url: getEnv(Env.DATABASE_URL),
  },
  strict: true,
});
