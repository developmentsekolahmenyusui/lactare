import crypto from 'crypto';
import { Env, getEnv } from './env';

interface GenerateSignatureProps {
  body: string;
  requestId: string;
  timestamp: string;
  target: string;
}

export function generateSignature(props: GenerateSignatureProps) {
  const clientId = getEnv(Env.DOKU_CLIENT_ID);
  const secretKey = getEnv(Env.DOKU_SECRET_KEY);

  const digestSHA256 = crypto.createHash('sha256').update(props.body, 'utf8').digest();

  const digestBase64 = digestSHA256.toString('base64');

  const signatureComponents =
    `Client-Id:${clientId}\n` +
    `Request-Id:${props.requestId}\n` +
    `Request-Timestamp:${props.timestamp}\n` +
    `Request-Target:${props.target}\n` +
    `Digest:${digestBase64}`;

  const signatureHmac = crypto.createHmac('sha256', secretKey).update(signatureComponents).digest('base64');

  return `HMACSHA256=${signatureHmac}`;
}
