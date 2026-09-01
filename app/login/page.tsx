'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-5">
      <div className="max-w-md w-full bg-ivory rounded-3xl p-8 lg:p-10 border border-sage/30">
        <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center mb-6">
          <Lock size={20} className="text-warm-white" />
        </div>
        <h1 className="font-display text-3xl text-forest-deep mb-2">Admin Access</h1>
        <p className="text-charcoal-soft text-sm mb-7">Sign in to view leads and payments.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Email</label>
            <input name="email" type="email" required className="input-field" placeholder="admin@sakshisingla.com" />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Password</label>
            <input name="password" type="password" required className="input-field" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-700 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="cta-primary w-full py-4 rounded-full text-[15px] flex items-center justify-center gap-2.5">
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}