'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { PLANS, STAY_ACCOUNTABLE } from '@/lib/constants';

declare global {
  interface Window { Razorpay?: any }
}

export default function CheckoutPage() {
  const params = useParams<{ plan: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const planId = params.plan as string;

  const plan = PLANS.find((p) => p.id === planId)
    ?? (planId === 'stay-accountable' ? STAY_ACCOUNTABLE : null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    setLoading(false);
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePay = async () => {
    if (!plan) return;
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Dietitian Sakshi Singla',
        description: data.plan_name,
        image: '/logo.png',
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: data.plan_name,
            }),
          });
          if (verifyRes.ok) {
            router.push('/success?plan=' + encodeURIComponent(data.plan_name));
          } else {
            setError('Payment verification failed. Please contact Sakshi.');
          }
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#2F4A3E' },
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Could not initiate payment');
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white pt-20">
        <div className="text-center">
          <h1 className="font-display text-3xl text-forest-deep mb-4">Plan not found</h1>
          <Link href="/#plans" className="arrow-link">View all plans</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white pt-20">
      <div className="max-w-2xl mx-auto px-5 py-12 lg:py-20">
        <Link href="/#plans" className="arrow-link text-sm mb-8 inline-flex">
          <ArrowLeft size={14} strokeWidth={2.5} /> Back to plans
        </Link>
        <div className="bg-ivory rounded-3xl p-8 lg:p-10 border border-sage/30">
          <div className="text-[10px] tracking-[0.25em] uppercase text-sage-dark font-semibold mb-2">Checkout</div>
          <h1 className="font-display text-3xl lg:text-4xl text-forest-deep mb-3">{plan.name}</h1>
          <p className="text-charcoal-soft mb-6">{plan.description}</p>
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-sage/30">
            <span className="font-display text-5xl font-medium text-forest-deep">{plan.priceLabel}</span>
            {plan.period && <span className="text-sage-dark text-sm">{plan.period}</span>}
          </div>
          <button onClick={handlePay} disabled={loading} className="cta-primary w-full py-4 rounded-full text-[15px] flex items-center justify-center gap-2.5 mb-4 disabled:opacity-60">
            <Lock size={16} strokeWidth={2.5} />
            <span>Pay {plan.priceLabel} Securely</span>
          </button>
          <div className="flex items-center justify-center gap-2 text-xs text-sage-dark">
            <ShieldCheck size={14} /> Secured by Razorpay · 256-bit encryption
          </div>
          {error && <p className="text-red-700 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}