import { redirect } from 'next/navigation';
import { Activity, CalendarCheck, Droplets, LogOut, Moon, Scale, Sparkles, Target } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ClientPage() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, { data: program }, { data: today }, { data: measurement }] = await Promise.all([
    supabase.from('profiles').select('full_name, email').eq('id', user.id).maybeSingle(),
    supabase.from('client_programs').select('current_week, end_date, programs(name, duration_weeks)').eq('client_id', user.id).eq('status', 'active').maybeSingle(),
    supabase.from('daily_checkins').select('id, water_litres, steps, sleep_hours, adherence_score').eq('client_id', user.id).eq('checkin_date', new Date().toISOString().slice(0, 10)).maybeSingle(),
    supabase.from('measurements').select('weight_kg').eq('client_id', user.id).order('measurement_date', { ascending: false }).limit(1).maybeSingle(),
  ]);

  const programDetails = Array.isArray(program?.programs) ? program.programs[0] : program?.programs;
  const duration = programDetails?.duration_weeks ?? 12;
  const currentWeek = program?.current_week ?? 1;
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <main className="min-h-screen bg-warm-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 border-b border-sage/30 pb-6">
          <div><div className="kicker mb-2">Client space</div><h1 className="font-display text-3xl text-forest-deep">Good morning, {firstName}</h1></div>
          <form action="/api/auth/logout" method="post"><button className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-white px-4 py-2.5 text-sm text-forest"><LogOut size={15} /> Sign out</button></form>
        </header>
        <section className="mt-7 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl bg-forest p-6 text-warm-white sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-sage-light">{programDetails?.name ?? 'Your transformation program'}</p><h2 className="mt-2 font-display text-4xl">Week {currentWeek} <span className="text-sage-light">/ {duration}</span></h2></div><Target className="text-sage-light" size={26} /></div>
            <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-sage-light" style={{ width: `${Math.min(100, (currentWeek / duration) * 100)}%` }} /></div>
            <p className="mt-3 text-sm text-sage-light">Your next step is consistency, one day at a time.</p>
          </div>
          <div className="rounded-3xl border border-sage/30 bg-ivory p-6"><p className="kicker mb-3">Today&apos;s check-in</p><div className="flex items-center gap-3"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${today ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}><CalendarCheck size={22} /></div><div><p className="font-display text-2xl text-forest-deep">{today ? 'Complete' : 'Not started'}</p><p className="text-sm text-charcoal-soft">{today ? 'You showed up today.' : 'Take 60 seconds for yourself.'}</p></div></div><a href="#check-in" className="cta-primary mt-6 inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm">{today ? 'Review check-in' : 'Complete check-in'}</a></div>
        </section>
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Current weight', value: measurement?.weight_kg ? `${measurement.weight_kg} kg` : 'Add measurement', icon: Scale },
            { label: 'Water today', value: today?.water_litres ? `${today.water_litres} L` : 'Not logged', icon: Droplets },
            { label: 'Steps today', value: today?.steps ? today.steps.toLocaleString('en-IN') : 'Not logged', icon: Activity },
            { label: 'Sleep last night', value: today?.sleep_hours ? `${today.sleep_hours} hrs` : 'Not logged', icon: Moon },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-3xl border border-sage/30 bg-ivory p-5"><Icon className="text-forest" size={19} /><p className="mt-4 font-display text-2xl text-forest-deep">{value}</p><p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-sage-dark">{label}</p></div>)}
        </section>
        <section id="check-in" className="mt-6 rounded-3xl border border-sage/30 bg-ivory p-6 sm:p-8"><div className="flex items-center gap-3"><Sparkles className="text-forest" size={20} /><h2 className="font-display text-2xl text-forest-deep">Your daily rhythm</h2></div><p className="mt-2 max-w-2xl text-sm leading-6 text-charcoal-soft">Your check-in data will appear here as soon as you submit it. The dietitian can then spot patterns in hydration, sleep, movement, energy and digestion.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-sage-light/50 p-4"><p className="text-xs uppercase tracking-[0.14em] text-sage-dark">Adherence</p><p className="mt-2 font-display text-2xl text-forest-deep">{today?.adherence_score ? `${today.adherence_score}%` : '--'}</p></div><div className="rounded-2xl bg-sage-light/50 p-4"><p className="text-xs uppercase tracking-[0.14em] text-sage-dark">Plan</p><p className="mt-2 font-display text-2xl text-forest-deep">{programDetails?.name ? 'Active' : 'Pending'}</p></div><div className="rounded-2xl bg-sage-light/50 p-4"><p className="text-xs uppercase tracking-[0.14em] text-sage-dark">End date</p><p className="mt-2 font-display text-2xl text-forest-deep">{program?.end_date ? new Date(program.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '--'}</p></div></div></section>
      </div>
    </main>
  );
}