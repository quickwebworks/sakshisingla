'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, Mail, Phone, Target, Calendar } from 'lucide-react';

interface Lead {
  id: string; name: string; email: string; phone: string; goal: string; status: string;
  source: string; created_at: string;
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<{ leads: number; paidPayments: number; newLeads: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/leads').then((r) => r.json()),
      fetch('/api/admin/stats').then((r) => r.json()),
    ]).then(([leadsData, statsData]) => {
      if (leadsData.leads) setLeads(leadsData.leads);
      if (statsData) setStats(statsData);
    }).finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-warm-white pt-20">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="kicker mb-2">Admin Dashboard</div>
            <h1 className="font-display text-3xl text-forest-deep">Leads & Payments</h1>
          </div>
          <button onClick={logout} className="cta-secondary px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Leads', value: stats.leads },
              { label: 'New Leads', value: stats.newLeads },
              { label: 'Paid Payments', value: stats.paidPayments },
            ].map((s) => (
              <div key={s.label} className="bg-ivory rounded-2xl p-5 border border-sage/30">
                <div className="font-display text-3xl font-medium text-forest">{s.value}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-sage-dark font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-charcoal-soft">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-charcoal-soft">No leads yet.</p>
        ) : (
          <div className="bg-ivory rounded-2xl border border-sage/30 overflow-hidden">
            {leads.map((lead) => (
              <div key={lead.id} className="p-5 border-b border-sage/20 last:border-0 grid md:grid-cols-5 gap-3 items-center">
                <div>
                  <div className="font-medium text-forest-deep">{lead.name}</div>
                  <div className="text-xs text-sage-dark flex items-center gap-1 mt-1"><Calendar size={11} /> {new Date(lead.created_at).toLocaleString()}</div>
                </div>
                <div className="text-sm text-charcoal-soft flex items-center gap-1.5"><Mail size={12} /> {lead.email}</div>
                <div className="text-sm text-charcoal-soft flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</div>
                <div className="text-sm text-charcoal-soft flex items-center gap-1.5"><Target size={12} /> {lead.goal}</div>
                <div className="text-right">
                  <span className="case-stamp text-[9px]" style={{ borderColor: lead.status === 'new' ? 'var(--forest)' : 'var(--sage-dark)', color: lead.status === 'new' ? 'var(--forest)' : 'var(--sage-dark)' }}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}