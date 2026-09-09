'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, LogOut } from 'lucide-react';

export default function LogoutPage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace('/login');
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-warm-white px-5 py-10 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[28px] border border-sage/30 bg-ivory p-8 text-center shadow-[0_24px_70px_-32px_rgba(47,74,62,0.4)] sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest text-warm-white shadow-lg shadow-forest/20">
          <LogOut size={25} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-forest">
          <CheckCircle2 size={16} /> Signed out securely
        </div>
        <h1 className="mt-3 font-display text-3xl text-forest-deep">Your workspace is closed</h1>
        <p className="mt-3 text-sm leading-6 text-charcoal-soft">Your session and protected access cookies have been cleared. You&apos;ll return to the sign-in page shortly.</p>
        <Link href="/login" className="cta-primary mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
          Return to sign in <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}
