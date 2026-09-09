'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, KeyRound, Link2, Lock, Mail } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase/client';

type LoginMode = 'password' | 'magic-link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<LoginMode>('password');
  const googleLoginEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN === 'true';

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    setMessage(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as { email?: string; password?: string };
    const nextPath = new URLSearchParams(window.location.search).get('next') || '';
    try {
      const supabase = supabaseBrowser();
      if (mode === 'magic-link') {
        const { error: authError } = await supabase.auth.signInWithOtp({
          email: data.email ?? '',
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (authError) throw authError;
        setMessage('Check your email for a secure sign-in link.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: data.email ?? '',
          password: data.password ?? '',
        });
        if (authError) throw authError;
        router.push(nextPath || '/portal');
        router.refresh();
      }
    } catch {
      // Keep the existing single-admin login usable while Supabase is configured.
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Invalid credentials');
        router.push(nextPath || '/dashboard');
      } catch {
        setError(mode === 'magic-link' ? 'Unable to send a sign-in link.' : 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-5">
      <div className="max-w-md w-full bg-ivory rounded-3xl p-8 lg:p-10 border border-sage/30">
        <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center mb-6">
          <KeyRound size={20} className="text-warm-white" />
        </div>
        <h1 className="font-display text-3xl text-forest-deep mb-2">Your wellness workspace</h1>
        <p className="text-charcoal-soft text-sm mb-7">Sign in to continue to your personalised nutrition dashboard.</p>
        <button
          type="button"
          disabled={!googleLoginEnabled || loading}
          onClick={async () => {
            if (!googleLoginEnabled) {
              setError('Google sign-in is currently disabled for this workspace. Please use Email or Magic Link instead.');
              return;
            }
            setLoading(true); setError(null);
            try {
              const { error: authError } = await supabaseBrowser().auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/auth/callback` },
              });
              if (authError) {
                if (authError.message?.toLowerCase().includes('not enabled') || authError.message?.toLowerCase().includes('unsupported provider')) {
                  setError('Google sign-in is not enabled in Supabase yet. Please use Email or Magic Link for now.');
                } else {
                  setError(authError.message || 'Google sign-in is not available right now.');
                }
              }
            } finally {
              setLoading(false);
            }
          }}
          className={`w-full py-3.5 rounded-full border font-medium flex items-center justify-center gap-2 transition ${!googleLoginEnabled ? 'border-sage/30 bg-sage/10 text-sage-dark cursor-not-allowed' : 'border-sage/50 bg-white text-forest hover:border-forest'}`}
        >
          <Mail size={16} /> {googleLoginEnabled ? 'Continue with Google' : 'Google sign-in unavailable'}
        </button>
        <div className="my-5 flex items-center gap-3 text-xs text-sage-dark"><span className="h-px flex-1 bg-sage/30" />OR<span className="h-px flex-1 bg-sage/30" /></div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Email</label>
            <input name="email" type="email" required className="input-field" placeholder="admin@sakshisingla.com" />
          </div>
          {mode === 'password' && <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase text-sage-dark font-semibold mb-1.5">Password</label>
            <input name="password" type="password" required className="input-field" placeholder="••••••••" />
          </div>}
          {error && <p className="text-red-700 text-sm">{error}</p>}
          {message && <p className="text-forest text-sm">{message}</p>}
          <button type="submit" disabled={loading} className="cta-primary w-full py-4 rounded-full text-[15px] flex items-center justify-center gap-2.5">
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </form>
        <button type="button" onClick={() => { setMode(mode === 'password' ? 'magic-link' : 'password'); setError(null); setMessage(null); }} className="mt-5 w-full text-sm text-forest inline-flex items-center justify-center gap-2">
          <Link2 size={14} /> {mode === 'password' ? 'Use a secure magic link instead' : 'Use password instead'}
        </button>
        <p className="mt-6 text-center text-xs text-sage-dark inline-flex items-center justify-center gap-1.5 w-full"><Lock size={12} /> Your account is protected by Supabase Auth.</p>
      </div>
    </div>
  );
}