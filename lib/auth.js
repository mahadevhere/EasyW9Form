import crypto from 'crypto';

const SECRET = process.env.ADMIN_SECRET || 'fallback-secret-change-me';

export function createToken(email) {
  const payload = JSON.stringify({ email, exp: Date.now() + 24 * 60 * 60 * 1000 }); // 24 hours
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  const token = Buffer.from(payload).toString('base64') + '.' + signature;
  return token;
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const payload = Buffer.from(payloadB64, 'base64').toString();
    const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');

    if (signature !== expectedSig) return null;

    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null; // expired

    return data;
  } catch {
    return null;
  }
}

export function validateAdmin(email, password) {
  return (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  );
}
