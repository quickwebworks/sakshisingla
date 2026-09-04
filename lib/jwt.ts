import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const JWT_COOKIE = 'sb-admin';
export const CLIENT_JWT_COOKIE = 'sb-client';
const ALG = 'HS256';

export interface AdminToken {
  sub: string;
  role: 'admin';
  iat: number;
  exp: number;
}

export function signAdminToken(userId: string): string {
  return jwt.sign(
    { sub: userId, role: 'admin' },
    process.env.JWT_SECRET!,
    { algorithm: ALG, expiresIn: '7d' }
  );
}

export function verifyAdminToken(token: string): AdminToken | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: [ALG],
    }) as AdminToken;
    return decoded?.role === 'admin' ? decoded : null;
  } catch {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<AdminToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(JWT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE);
}

export interface ClientToken {
  sub: string;
  role: 'client';
  iat: number;
  exp: number;
}

export function signClientToken(clientId: string): string {
  return jwt.sign({ sub: clientId, role: 'client' }, process.env.JWT_SECRET!, {
    algorithm: ALG,
    expiresIn: '30d',
  });
}

export function verifyClientToken(token: string): ClientToken | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: [ALG] }) as ClientToken;
    return decoded?.role === 'client' ? decoded : null;
  } catch {
    return null;
  }
}

export async function getClientFromCookie(): Promise<ClientToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_JWT_COOKIE)?.value;
  return token ? verifyClientToken(token) : null;
}

export async function setClientCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(CLIENT_JWT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearClientCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(CLIENT_JWT_COOKIE);
}