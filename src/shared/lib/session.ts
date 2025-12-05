'use server';

import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { Env, getEnv } from './env';
import { redirect } from 'next/navigation';

type SessionData = {
  isAuthenticated: boolean;
};

export async function getSession() {
  const cookie = await cookies();
  const opt: SessionOptions = {
    password: getEnv(Env.SESSION_SECRET),
    cookieName: 'lactare',
    cookieOptions: {
      httpOnly: true,
      secure: getEnv(Env.NODE_ENV) === 'production',
    },
  };

  return await getIronSession<SessionData>(cookie, opt);
}

export async function login(_: { error?: string }, formData: FormData) {
  const session = await getSession();

  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString().trim();

  const isValidAdmin = username === getEnv(Env.ADMIN_USERNAME) && password === getEnv(Env.ADMIN_PASSWORD);

  console.log(username);
  console.log(password);

  if (!isValidAdmin) {
    return { error: 'Invalid Credential' };
  }

  session.isAuthenticated = true;
  await session.save();

  redirect('/transaction');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
