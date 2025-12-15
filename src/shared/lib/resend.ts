'use server';

import { Resend } from 'resend';
import { Env, getEnv } from './env';

const DEFAULT_FROM = 'Sekolah Menyusui Team <noreply@sekolahmenyusui.id>';

const resend = new Resend(getEnv(Env.RESEND_API_KEY));

interface Params {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(params: Params) {
  const { error } = await resend.emails.send({
    from: params.from ?? DEFAULT_FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
  if (error) {
    console.error('error while sending email: ', error);
  }
  console.log('SUCCESS RESEND');
}
