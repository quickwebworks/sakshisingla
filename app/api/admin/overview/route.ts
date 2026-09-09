import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/jwt';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [{ data: payments, error: paymentsError }, { data: profiles, error: profilesError }, { data: programs, error: programsError }] = await Promise.all([
    supabaseAdmin.from('payments').select('id, plan, amount_paise, status, created_at, verified_at, metadata, razorpay_order_id').order('created_at', { ascending: false }).limit(200),
    supabaseAdmin.from('profiles').select('id, full_name, email, phone, role, created_at').eq('role', 'client').order('created_at', { ascending: false }).limit(200),
    supabaseAdmin.from('client_programs').select('id, client_id, start_date, end_date, status, profiles(full_name, email), programs(name)').order('start_date', { ascending: false }).limit(200),
  ]);

  if (paymentsError) {
    console.error('Admin overview payment query failed:', paymentsError);
    return NextResponse.json({ error: 'Could not load admin data' }, { status: 500 });
  }
  if (profilesError || programsError) console.error('Admin overview optional query failed:', profilesError || programsError);

  const paymentRows = (payments ?? []).map((payment) => {
    const metadata = payment.metadata && typeof payment.metadata === 'object' ? payment.metadata as Record<string, unknown> : {};
    return {
      id: payment.id,
      customer: String(metadata.customer_name || metadata.customer_email || metadata.user_id || 'Signed-in client'),
      plan: payment.plan,
      amount: Math.round(payment.amount_paise / 100),
      status: payment.status,
      date: payment.created_at,
    };
  });

  const subscriptions = (programs ?? []).map((program) => {
    const profile = Array.isArray(program.profiles) ? program.profiles[0] : program.profiles;
    const plan = Array.isArray(program.programs) ? program.programs[0] : program.programs;
    return {
      id: program.id,
      customer: profile?.full_name || profile?.email || 'Client',
      plan: plan?.name || 'Assigned program',
      nextBilling: program.end_date,
      amount: 0,
      status: program.status === 'active' ? 'active' : 'paused',
    };
  });

  return NextResponse.json({ payments: paymentRows, clients: profiles ?? [], subscriptions });
}
