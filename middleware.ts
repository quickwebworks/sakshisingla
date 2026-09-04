import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_COOKIE = 'sb-admin';
const CLIENT_COOKIE = 'sb-client';

export function middleware(req: NextRequest) {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };
    if (decoded.role !== (isAdminPath ? 'admin' : 'client')) throw new Error('invalid role');
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*', '/account/:path*', '/api/client/:path*'],
};