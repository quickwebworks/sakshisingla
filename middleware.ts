import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_COOKIE = 'sb-admin';
const CLIENT_COOKIE = 'sb-client';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminPaths = ['/dashboard', '/api/admin'];
  const clientPaths = ['/account', '/api/client'];
  const isAdminPath = adminPaths.some((p) => pathname.startsWith(p));
  const isClientPath = clientPaths.some((p) => pathname.startsWith(p));

  if (!isAdminPath && !isClientPath) return NextResponse.next();

  const token = req.cookies.get(isAdminPath ? ADMIN_COOKIE : CLIENT_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not configured');
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ['HS256'] });
    if (payload.role !== (isAdminPath ? 'admin' : 'client')) throw new Error('invalid role');
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*', '/account/:path*', '/api/client/:path*'],
};