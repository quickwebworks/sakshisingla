import { NextResponse } from 'next/server';
import { clearAdminCookie, clearClientCookie } from '@/lib/jwt';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  await clearAdminCookie();
  await clearClientCookie();
  return NextResponse.redirect(new URL('/logout', req.url));
}