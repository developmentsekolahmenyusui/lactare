export const Env = {
  NODE_ENV: 'NODE_ENV',
  SESSION_SECRET: 'SESSION_SECRET',
  ADMIN_USERNAME: 'ADMIN_USERNAME',
  ADMIN_PASSWORD: 'ADMIN_PASSWORD',
  DATABASE_URL: 'DATABASE_URL',
  DOKU_CLIENT_ID: 'DOKU_CLIENT_ID',
  DOKU_SECRET_KEY: 'DOKU_SECRET_KEY',
  DOKU_BASE_URL: 'DOKU_BASE_URL',
} as const;

type EnvKey = (typeof Env)[keyof typeof Env];

export const getEnv = (key: EnvKey): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};
