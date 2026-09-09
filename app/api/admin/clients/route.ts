import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/jwt';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Admin authentication required' }, { status: 401 });

  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

    if (name.length < 2 || !email.includes('@') || phone.length < 7) {
      return NextResponse.json({ error: 'Enter a valid name, email, and phone number.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: name, phone },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (data.user) {
      await supabaseAdmin.from('profiles').upsert({
        id: data.user.id,
        full_name: name,
        email,
        phone,
        role: 'client',
      });
    }

    return NextResponse.json({ ok: true, message: `Invitation sent to ${email}.` });
  } catch (error) {
    console.error('Client invitation error:', error);
    return NextResponse.json({ error: 'Could not create client invitation.' }, { status: 500 });
  }
}
