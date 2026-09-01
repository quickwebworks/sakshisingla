import { NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/zod';
import { signAdminToken, setAdminCookie } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }
    const { email, password } = parsed.data;

    // Verify against env vars (single admin for now — swap to Supabase Auth if you want multiple admins)
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAdminToken(email);
    await setAdminCookie(token);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}