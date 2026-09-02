import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { leadSchema } from '@/lib/zod';
import { sendLeadEmails } from '@/lib/resend';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse({
      ...body,
      source: body.source ?? 'landing',
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const { name, email, phone, goal, source } = parsed.data;

    const h = await headers();
    const ip = h.get('x-forwarded-for')?.split(',')[0] ?? null;
    const userAgent = h.get('user-agent');

    // Insert into Supabase (RLS allows anon insert)
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name, email, phone, goal, source, ip, user_agent: userAgent,
      })
      .select('id, reference_number')
      .single();

    if (error) {
      console.error('Supabase insert failed:', error);
      return NextResponse.json({ error: 'Could not save lead' }, { status: 500 });
    }

    await sendLeadEmails({
      name,
      email,
      phone,
      goal,
      referenceNumber: data.reference_number,
    });

    return NextResponse.json({ ok: true, id: data.id, referenceNumber: data.reference_number });
  } catch (err) {
    console.error('Lead route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}