import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/jwt';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [{ count: leadsCount }, { count: paidCount }, { data: recent }] = await Promise.all([
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
    supabaseAdmin.from('leads').select('status').limit(500),
  ]);

  return NextResponse.json({
    leads: leadsCount ?? 0,
    paidPayments: paidCount ?? 0,
    newLeads: recent?.filter((l) => l.status === 'new').length ?? 0,
  });
}