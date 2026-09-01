'use client';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { PLANS, STAY_ACCOUNTABLE } from '@/lib/constants';
import { useEffect } from 'react';

export default function Packages() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="plans" className="relative py-20 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="kicker mb-5 justify-center inline-flex">Section 03 — Choose</div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-forest-deep mb-4">
            <span className="line-block"><span>Choose Your </span><span className="italic font-light text-forest">Path</span></span>
          </h2>
          <p className="text-charcoal-soft max-w-lg mx-auto reveal">Simple plans. Clear pricing. Personalized guidance.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <div key={plan.id} className={`pricing-card reveal delay-${i + 1} rounded-3xl bg-warm-white p-7 lg:p-8 flex flex-col ${plan.popular ? 'pricing-featured' : ''} ${plan.popular ? 'lg:p-9' : ''}`}>
              {plan.badge && (
                <div className={`text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 ${plan.popular ? 'text-forest' : 'text-sage-dark'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-forest text-warm-white text-[10px] tracking-[0.22em] uppercase font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  )}
                  {plan.badge}
                </div>
              )}
              <h3 className="font-display text-2xl lg:text-3xl text-forest-deep mb-2">{plan.name}</h3>
              <p className="text-sm text-charcoal-soft mb-5">{plan.description}</p>
              <div className="flex items-baseline gap-3 mb-1.5">
                {plan.originalPrice && <span className="price-strike font-display text-xl">₹{plan.originalPrice.toLocaleString('en-IN')}</span>}
                <span className="font-display text-5xl lg:text-6xl font-medium text-forest-deep leading-none">{plan.priceLabel}</span>
              </div>
              {plan.period && <div className="text-sm text-sage-dark font-medium mb-1">{plan.period}</div>}
              {plan.saveBadge && <div className="inline-flex w-fit items-center gap-1.5 bg-sage-light/40 text-forest text-xs font-semibold px-2.5 py-1 rounded-full mb-6">{plan.saveBadge}</div>}
              {!plan.saveBadge && <div className="mb-6" />}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-charcoal-soft">
                    <Check size={16} strokeWidth={2.5} className="text-forest mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/checkout/${plan.id}`} className={`${plan.popular ? 'cta-primary' : 'cta-secondary'} block w-full py-${plan.popular ? '4' : '3.5'} rounded-full text-center text-sm`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Stay Accountable */}
        <div className="max-w-3xl mx-auto mt-10 reveal">
          <div className="rounded-2xl bg-beige/50 border border-sage/30 p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="case-stamp text-[10px]">Existing Clients Only</span>
              </div>
              <h4 className="font-display text-xl lg:text-2xl text-forest-deep mb-1">Already completed a program?</h4>
              <p className="text-sm text-charcoal-soft">Stay Accountable — <span className="font-semibold text-forest">{STAY_ACCOUNTABLE.priceLabel}</span> · {STAY_ACCOUNTABLE.description}</p>
            </div>
            <Link href={`/checkout/stay-accountable`} className="cta-secondary shrink-0 px-6 py-3 rounded-full text-sm whitespace-nowrap">
              {STAY_ACCOUNTABLE.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}