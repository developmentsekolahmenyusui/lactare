export const Env = {
  NODE_ENV: 'NODE_ENV',
  SESSION_SECRET: 'SESSION_SECRET',
  ADMIN_USERNAME: 'ADMIN_USERNAME',
  ADMIN_PASSWORD: 'ADMIN_PASSWORD',
} as const;

type EnvKey = (typeof Env)[keyof typeof Env];

export const getEnv = (key: EnvKey): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};
