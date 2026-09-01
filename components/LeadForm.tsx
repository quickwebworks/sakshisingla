'use client';
import { useState } from 'react';
import { useToast } from './ToastProvider';
import { ArrowRight } from 'lucide-react';
import { MYSTERY_OPTIONS } from '@/lib/constants';

export default function LeadForm() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setLoading(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      toast('Thanks — Sakshi will personally reach out within 24 hours.');
      form.reset();
    } catch {
      toast('Something went wrong. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Name</label>
        <input id="name" name="name" type="text" required className="input-field" placeholder="Your full name" autoComplete="name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Phone</label>
          <input id="phone" name="phone" type="tel" required className="input-field" placeholder="+91 98765 43210" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="email" className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Email</label>
          <input id="email" name="email" type="email" required className="input-field" placeholder="you@email.com" autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="goal" className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Primary Goal</label>
        <select id="goal" name="goal" required className="input-field appearance-none bg-warm-white" defaultValue="">
          <option value="" disabled>Select your goal</option>
          {MYSTERY_OPTIONS.map((o) => <option key={o.id} value={o.title}>{o.title}</option>)}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="cta-primary w-full py-4 rounded-full text-[15px] flex items-center justify-center gap-2.5 mt-2 disabled:opacity-60">
        <span>{loading ? 'Sending...' : 'Help Me Choose'}</span>
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
      <p className="text-[11px] text-center text-sage-dark mt-2">By submitting, you agree to be contacted about your nutrition enquiry.</p>
    </form>
  );
}