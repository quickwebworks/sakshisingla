import { redirect } from 'next/navigation';
import { AlertCircle, CalendarCheck, ClipboardList, LogOut, Users } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DietitianPage() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle();
  if (!profile || !['dietitian', 'staff'].includes(profile.role)) redirect('/client');

  const { data: assignments } = await supabase.from('dietitian_clients').select('client_id, status, profiles!dietitian_clients_client_id_fkey(full_name, email)').eq('dietitian_id', user.id);
  const clients = assignments ?? [];
  const active = clients.filter((client) => client.status === 'active').length;

  return <main className="min-h-screen bg-warm-white px-4 py-6 sm:px-6 lg:px-10"><div className="mx-auto max-w-7xl"><header className="flex flex-col gap-4 border-b border-sage/30 pb-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="kicker mb-2">Dietitian workspace</div><h1 className="font-display text-3xl text-forest-deep">Good morning, {profile.full_name?.split(' ')[0] || 'Sakshi'}</h1><p className="mt-1 text-sm text-charcoal-soft">A clear view of who needs your attention today.</p></div><form action="/api/auth/logout" method="post"><button className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-white px-4 py-2.5 text-sm text-forest"><LogOut size={15} /> Sign out</button></form></header><section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ label: 'Active clients', value: active, icon: Users }, { label: 'Checked in today', value: '--', icon: CalendarCheck }, { label: 'Pending check-ins', value: '--', icon: ClipboardList }, { label: 'Need attention', value: '--', icon: AlertCircle }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-3xl border border-sage/30 bg-ivory p-5"><Icon className="text-forest" size={19} /><p className="mt-4 font-display text-3xl text-forest-deep">{value}</p><p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-sage-dark">{label}</p></div>)}</section><section className="mt-6 rounded-3xl border border-sage/30 bg-ivory p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><div className="kicker mb-2">Your caseload</div><h2 className="font-display text-2xl text-forest-deep">Clients</h2></div><button className="cta-primary rounded-full px-5 py-3 text-sm">Add client</button></div>{clients.length ? <div className="mt-6 divide-y divide-sage/20">{clients.map((client) => { const clientProfile = Array.isArray(client.profiles) ? client.profiles[0] : client.profiles; return <div key={client.client_id} className="flex items-center justify-between gap-4 py-4"><div><p className="font-medium text-forest-deep">{clientProfile?.full_name || 'Unnamed client'}</p><p className="text-sm text-charcoal-soft">{clientProfile?.email || 'No email'}</p></div><span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold capitalize text-forest">{client.status}</span></div>; })}</div> : <div className="mt-6 rounded-2xl bg-sage-light/50 p-6 text-sm text-charcoal-soft">No clients are assigned yet. Add your first client to begin building their program.</div>}</section></div></main>;
}