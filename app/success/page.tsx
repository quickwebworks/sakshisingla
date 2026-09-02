'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

function SuccessContent() {
  const params = useSearchParams();
  const plan = params.get('plan') ?? 'your plan';

  return (
    <div className="min-h-screen bg-peach-soft flex items-center justify-center pt-20 px-5">
      <div className="max-w-lg w-full bg-warm-white rounded-3xl p-8 lg:p-10 text-center shadow-2xl border border-sage/30">
        <div className="w-16 h-16 rounded-full bg-sage-light/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-forest" />
        </div>
        <h1 className="font-display text-3xl lg:text-4xl text-forest-deep mb-3">Payment received.</h1>
        <p className="text-charcoal-soft mb-7">
          Thank you. Your <strong className="text-forest">{plan}</strong> is confirmed. Sakshi will personally reach out within 24 hours to kick off your program.
        </p>
        <a href={whatsappLink('Hi Sakshi, I just paid for ' + plan)} target="_blank" rel="noopener" className="cta-wa inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px] mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>
          Say hi on WhatsApp
        </a>
        <Link href="/" className="arrow-link text-sm block">Back to home <ArrowRight size={14} strokeWidth={2.5} /></Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}