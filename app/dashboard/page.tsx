'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Calendar, CheckCircle2, CreditCard, Download, LogOut, Mail, PackageCheck, Phone, Search, ShieldCheck, Sparkles, Target, TrendingUp, Users } from 'lucide-react';

type Tab = 'overview' | 'leads' | 'payments' | 'packages' | 'subscriptions';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  goal: string;
  status: 'new' | 'qualified' | 'booked' | 'follow-up';
  source: string;
  created_at: string;
};

type Payment = {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'refunded';
  date: string;
};

type PackageRow = {
  id: string;
  name: string;
  price: number;
  sales: number;
  status: 'active' | 'paused';
};

type SubscriptionRow = {
  id: string;
  customer: string;
  plan: string;
  nextBilling: string;
  amount: number;
  status: 'active' | 'trial' | 'paused';
};

const mockLeads: Lead[] = [
  { id: 'LD-1042', name: 'Meher Kaur', email: 'meher@example.com', phone: '+91 98765 43210', goal: 'Weight Management', status: 'new', source: 'Website', created_at: '2026-09-08T10:42:00.000Z' },
  { id: 'LD-1041', name: 'Anik Sharma', email: 'anik@example.com', phone: '+91 91234 56789', goal: 'PCOS Nutrition', status: 'qualified', source: 'Instagram', created_at: '2026-09-07T18:20:00.000Z' },
  { id: 'LD-1038', name: 'Riya Mehta', email: 'riya@example.com', phone: '+91 96543 22111', goal: 'Gut Health', status: 'booked', source: 'WhatsApp', created_at: '2026-09-06T09:10:00.000Z' },
  { id: 'LD-1034', name: 'Karan Gill', email: 'karan@example.com', phone: '+91 98100 77553', goal: 'Lifestyle Counselling', status: 'follow-up', source: 'Google', created_at: '2026-09-05T14:05:00.000Z' },
];

const mockPayments: Payment[] = [
  { id: 'PAY-9201', customer: 'Meher Kaur', plan: 'Nutrition Consultation', amount: 999, status: 'paid', date: '2026-09-08' },
  { id: 'PAY-9198', customer: 'Anik Sharma', plan: '12-Week Transformation', amount: 9999, status: 'paid', date: '2026-09-07' },
  { id: 'PAY-9192', customer: 'Riya Mehta', plan: '30-Day Personalized Plan', amount: 3999, status: 'pending', date: '2026-09-05' },
  { id: 'PAY-9187', customer: 'Karan Gill', plan: 'Stay Accountable', amount: 1499, status: 'refunded', date: '2026-09-04' },
];

const mockPackages: PackageRow[] = [
  { id: 'PKG-01', name: 'Nutrition Consultation', price: 999, sales: 42, status: 'active' },
  { id: 'PKG-02', name: '30-Day Personalized Plan', price: 3999, sales: 18, status: 'active' },
  { id: 'PKG-03', name: '12-Week Transformation', price: 9999, sales: 24, status: 'active' },
  { id: 'PKG-04', name: 'Stay Accountable', price: 1499, sales: 11, status: 'paused' },
];

const mockSubscriptions: SubscriptionRow[] = [
  { id: 'SUB-101', customer: 'Aisha Verma', plan: 'Stay Accountable', nextBilling: '2026-09-21', amount: 1499, status: 'active' },
  { id: 'SUB-099', customer: 'Rashi Sethi', plan: '30-Day Personalized Plan', nextBilling: '2026-09-18', amount: 3999, status: 'trial' },
  { id: 'SUB-097', customer: 'Tanya Bedi', plan: 'Stay Accountable', nextBilling: '2026-09-15', amount: 1499, status: 'paused' },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const statusClasses: Record<string, string> = {
  new: 'bg-forest/10 text-forest border border-forest/20',
  qualified: 'bg-sage-light/80 text-forest border border-sage/40',
  booked: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'follow-up': 'bg-amber-100 text-amber-800 border border-amber-200',
  paid: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  pending: 'bg-amber-100 text-amber-800 border border-amber-200',
  refunded: 'bg-rose-100 text-rose-700 border border-rose-200',
  active: 'bg-forest/10 text-forest border border-forest/20',
  paused: 'bg-slate-200 text-slate-700 border border-slate-300',
  trial: 'bg-sky-100 text-sky-800 border border-sky-200',
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [packages, setPackages] = useState<PackageRow[]>(mockPackages);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>(mockSubscriptions);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let ignore = false;

    const fetchDashboard = async () => {
      try {
        const [leadsRes, statsRes] = await Promise.all([
          fetch('/api/admin/leads', { cache: 'no-store' }),
          fetch('/api/admin/stats', { cache: 'no-store' }),
        ]);

        if (!ignore) {
          if (leadsRes.ok) {
            const leadsData = await leadsRes.json();
            if (Array.isArray(leadsData?.leads) && leadsData.leads.length) setLeads(leadsData.leads);
          }

          if (statsRes.ok) {
            const statsData = await statsRes.json();
            if (statsData?.leads != null) {
              const t = statsData.leads;
              if (!leads.length && t > 0) {
                setLeads((current) => current.length ? current : mockLeads);
              }
            }
          }
        }
      } catch {
        if (!ignore) {
          setLeads(mockLeads);
          setPayments(mockPayments);
          setPackages(mockPackages);
          setSubscriptions(mockSubscriptions);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      ignore = true;
    };
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesQuery = `${lead.name} ${lead.email} ${lead.goal}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [leads, query, statusFilter]);

  const totalRevenue = payments.reduce((sum, payment) => sum + (payment.status === 'paid' ? payment.amount : 0), 0);
  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users },
    { label: 'New Leads', value: leads.filter((lead) => lead.status === 'new').length, icon: Sparkles },
    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: TrendingUp },
    { label: 'Paid', value: payments.filter((p) => p.status === 'paid').length, icon: CheckCircle2 },
  ];

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-warm-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-6 sm:py-8 lg:py-10">
        <header className="rounded-[28px] border border-sage/30 bg-ivory p-4 sm:p-5 lg:p-6 shadow-[0_20px_60px_-30px_rgba(47,74,62,0.28)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="kicker mb-2">Admin Console</div>
              <h1 className="font-display text-3xl sm:text-4xl text-forest-deep">Leads, revenue & client management</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-sage/50 bg-white px-4 py-2.5 text-sm font-medium text-forest transition hover:border-forest hover:bg-sage-light">
                <Download size={15} />
                Export
              </button>
              <button onClick={logout} className="cta-secondary inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 rounded-full text-sm">
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </header>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {[
            ['overview', 'Overview'],
            ['leads', 'Leads'],
            ['payments', 'Payments'],
            ['packages', 'Packages'],
            ['subscriptions', 'Subscriptions'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as Tab)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                activeTab === key ? 'border-forest bg-forest text-warm-white' : 'border-sage/40 bg-white text-forest hover:border-forest/60'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="mt-8 rounded-3xl border border-sage/30 bg-ivory p-8 text-sm text-charcoal-soft">Loading dashboard data…</div>
        ) : (
          <main className="mt-6 space-y-6">
            {activeTab === 'overview' && (
              <>
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.label} className="rounded-3xl border border-sage/30 bg-ivory p-5 shadow-[0_16px_50px_-24px_rgba(47,74,62,0.35)]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-warm-white">
                            <Icon size={18} />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.18em] text-sage-dark">Live</span>
                        </div>
                        <div className="font-display text-3xl text-forest-deep">{item.value}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-sage-dark">{item.label}</div>
                      </article>
                    );
                  })}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                  <article className="rounded-3xl border border-sage/30 bg-ivory p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-display text-2xl text-forest-deep">Recent leads</h2>
                      <button onClick={() => setActiveTab('leads')} className="inline-flex items-center gap-2 text-sm font-medium text-forest">
                        View all <ArrowUpRight size={15} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {leads.slice(0, 4).map((lead) => (
                        <div key={lead.id} className="flex flex-col gap-3 rounded-2xl border border-sage/20 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="font-medium text-forest-deep">{lead.name}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-sage-dark">
                              <span className="inline-flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                              <span className="inline-flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[lead.status]}`}>
                              {lead.status}
                            </span>
                            <span className="text-xs text-charcoal-soft">{new Date(lead.created_at).toLocaleDateString('en-IN')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-3xl border border-sage/30 bg-ivory p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-display text-2xl text-forest-deep">Payments</h2>
                      <button onClick={() => setActiveTab('payments')} className="inline-flex items-center gap-2 text-sm font-medium text-forest">
                        Open <ArrowUpRight size={15} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {payments.slice(0, 4).map((payment) => (
                        <div key={payment.id} className="rounded-2xl border border-sage/20 bg-white p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium text-forest-deep">{payment.customer}</div>
                              <div className="text-xs text-sage-dark">{payment.plan}</div>
                            </div>
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[payment.status]}`}>
                              {payment.status}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-charcoal-soft">{payment.date}</span>
                            <span className="font-semibold text-forest">{formatCurrency(payment.amount)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </section>
              </>
            )}

            {activeTab === 'leads' && (
              <section className="rounded-3xl border border-sage/30 bg-ivory p-4 sm:p-5 lg:p-6">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="kicker mb-2">Leads</div>
                    <h2 className="font-display text-2xl text-forest-deep">Client enquiries</h2>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="relative block">
                      <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sage-dark" />
                      <input
                        type="search"
                        placeholder="Search leads"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="input-field min-h-[44px] pl-10"
                      />
                    </label>
                    <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="input-field min-h-[44px] sm:max-w-[180px]">
                      <option value="all">All status</option>
                      <option value="new">New</option>
                      <option value="qualified">Qualified</option>
                      <option value="booked">Booked</option>
                      <option value="follow-up">Follow-up</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.18em] text-sage-dark">
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Client</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Goal</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Source</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Status</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="align-top text-sm text-charcoal-soft hover:bg-white/70">
                          <td className="border-b border-sage/20 px-3 py-3">
                            <div className="font-medium text-forest-deep">{lead.name}</div>
                            <div className="mt-1 flex items-center gap-1.5"><Mail size={12} /> {lead.email}</div>
                            <div className="mt-1 flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</div>
                          </td>
                          <td className="border-b border-sage/20 px-3 py-3"><span className="inline-flex items-center gap-1.5"><Target size={12} /> {lead.goal}</span></td>
                          <td className="border-b border-sage/20 px-3 py-3">{lead.source}</td>
                          <td className="border-b border-sage/20 px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[lead.status]}`}>{lead.status}</span></td>
                          <td className="border-b border-sage/20 px-3 py-3 whitespace-nowrap"><span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {new Date(lead.created_at).toLocaleDateString('en-IN')}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'payments' && (
              <section className="rounded-3xl border border-sage/30 bg-ivory p-4 sm:p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="kicker mb-2">Payments</div>
                    <h2 className="font-display text-2xl text-forest-deep">Transactions</h2>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full border border-sage/50 bg-white px-4 py-2.5 text-sm font-medium text-forest">
                    <CreditCard size={15} /> Payment log
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.18em] text-sage-dark">
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">ID</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Customer</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Plan</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Amount</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="text-sm text-charcoal-soft hover:bg-white/70">
                          <td className="border-b border-sage/20 px-3 py-3 font-medium text-forest">{payment.id}</td>
                          <td className="border-b border-sage/20 px-3 py-3">{payment.customer}</td>
                          <td className="border-b border-sage/20 px-3 py-3">{payment.plan}</td>
                          <td className="border-b border-sage/20 px-3 py-3 font-semibold text-forest">{formatCurrency(payment.amount)}</td>
                          <td className="border-b border-sage/20 px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[payment.status]}`}>{payment.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'packages' && (
              <section className="rounded-3xl border border-sage/30 bg-ivory p-4 sm:p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="kicker mb-2">Packages</div>
                    <h2 className="font-display text-2xl text-forest-deep">Offer catalog</h2>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-warm-white">
                    <PackageCheck size={15} /> Add package
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.18em] text-sage-dark">
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Package</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Sales</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Price</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg) => (
                        <tr key={pkg.id} className="text-sm text-charcoal-soft hover:bg-white/70">
                          <td className="border-b border-sage/20 px-3 py-3 font-medium text-forest">{pkg.name}</td>
                          <td className="border-b border-sage/20 px-3 py-3">{pkg.sales}</td>
                          <td className="border-b border-sage/20 px-3 py-3 font-semibold text-forest">{formatCurrency(pkg.price)}</td>
                          <td className="border-b border-sage/20 px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[pkg.status]}`}>{pkg.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'subscriptions' && (
              <section className="rounded-3xl border border-sage/30 bg-ivory p-4 sm:p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="kicker mb-2">Subscriptions</div>
                    <h2 className="font-display text-2xl text-forest-deep">Membership pipeline</h2>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full border border-sage/50 bg-white px-4 py-2.5 text-sm font-medium text-forest">
                    <ShieldCheck size={15} /> Manage plans
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.18em] text-sage-dark">
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Customer</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Plan</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Next billing</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Amount</th>
                        <th className="border-b border-sage/30 px-3 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((item) => (
                        <tr key={item.id} className="text-sm text-charcoal-soft hover:bg-white/70">
                          <td className="border-b border-sage/20 px-3 py-3 font-medium text-forest">{item.customer}</td>
                          <td className="border-b border-sage/20 px-3 py-3">{item.plan}</td>
                          <td className="border-b border-sage/20 px-3 py-3">{item.nextBilling}</td>
                          <td className="border-b border-sage/20 px-3 py-3 font-semibold text-forest">{formatCurrency(item.amount)}</td>
                          <td className="border-b border-sage/20 px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[item.status]}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </main>
        )}
      </div>
    </div>
  );
}