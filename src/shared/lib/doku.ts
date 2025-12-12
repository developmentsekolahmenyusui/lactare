import crypto from 'crypto';

interface GenerateSignatureProps {
  body: string;
  requestId: string;
  timestamp: string;
  target: string;
  clientId: string;
  secretKey: string;
}

export function generateSignature(props: GenerateSignatureProps) {
  const digestSHA256 = crypto.createHash('sha256').update(props.body, 'utf8').digest();
  const digestBase64 = digestSHA256.toString('base64');

  const signatureComponents =
    `Client-Id:${props.clientId}\n` +
    `Request-Id:${props.requestId}\n` +
    `Request-Timestamp:${props.timestamp}\n` +
    `Request-Target:${props.target}\n` +
    `Digest:${digestBase64}`;

  const signatureHmac = crypto
    .createHmac('sha256', props.secretKey)
    .update(signatureComponents)
    .digest('base64');

  return `HMACSHA256=${signatureHmac}`;
}
