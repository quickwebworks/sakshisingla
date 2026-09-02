'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Scale, Activity, Zap, Dumbbell, Heart, Droplet, Sparkles, UtensilsCrossed, Layers, ArrowRight } from 'lucide-react';
import { MYSTERY_OPTIONS, MYSTERY_STRATEGIES } from '@/lib/constants';

const icons = {
  scale: Scale, hormone: Droplet, pulse: Activity, bolt: Zap, dumbbell: Dumbbell, heart: Heart, sparkle: Sparkles, utensils: UtensilsCrossed, layers: Layers,
};

export default function HealthMystery() {
  const [active, setActive] = useState<string | null>(null);
  const planLinkRef = useRef<HTMLAnchorElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    setActive(id);
  };

  useEffect(() => {
    if (!active) return;
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      planLinkRef.current?.focus({ preventScroll: true });
    });
  }, [active]);

  const strategy = active ? MYSTERY_STRATEGIES[active] : null;

  return (
    <section id="mystery" className="relative py-20 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="kicker mb-5 justify-center inline-flex">Section 01 — Discovery</div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-forest-deep mb-4">
            <span className="line-block"><span>What's Your </span><span className="italic font-light text-forest">Health Mystery?</span></span>
          </h2>
          <p className="text-charcoal-soft max-w-xl mx-auto reveal">Select the area you want to investigate. We'll map it to your personalized nutrition strategy.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {MYSTERY_OPTIONS.map((opt, i) => {
            const Icon = icons[opt.icon as keyof typeof icons];
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                aria-pressed={active === opt.id}
                className={`mystery-card rounded-2xl p-6 text-left ${active === opt.id ? 'active' : ''}`}
              >
                <div className={`mystery-icon w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4 transition-colors`}>
                  <Icon size={20} className="text-forest" />
                </div>
                <h3 className="font-display text-xl font-medium mb-1.5">{opt.title}</h3>
                <p className="mystery-desc text-sm text-charcoal-soft">{opt.desc}</p>
              </button>
            );
          })}
        </div>

        <div ref={detailsRef} className={`max-w-5xl mx-auto mt-12 lg:mt-16 transition-opacity duration-300 ${active ? 'opacity-100' : 'hidden'}`}>
          <div className="relative">
            <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-12 pointer-events-none" viewBox="0 0 240 48">
              <path d="M10 5 Q 120 -5 230 5" stroke="#7E906F" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.5" />
            </svg>
            <div className="rounded-3xl bg-forest text-warm-white overflow-hidden shadow-2xl md:grid md:grid-cols-[0.9fr_1.1fr] md:text-left">
              {strategy?.image && (
                <div className="min-h-64 md:min-h-full">
                  <img
                    src={strategy.image}
                    alt={strategy.title}
                    className="h-full min-h-64 w-full object-cover object-center"
                  />
                </div>
              )}

              <div className="p-8 lg:p-10">
                <div className="text-[11px] tracking-[0.25em] uppercase text-sage-light font-semibold mb-3">Your Personalized Nutrition Strategy</div>
                <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-3">{strategy?.title}</h3>
                <p className="text-sage-light/90 text-sm leading-relaxed mb-6">{strategy?.subtitle}</p>

                <ul className="space-y-3 text-sm text-sage-light/90 mb-8">
                  {strategy?.points.map((point, index) => (
                    <li key={point} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-light text-xs font-semibold text-forest">{index + 1}</span>
                      <span className={index === 0 && strategy.title === 'Weight Management' ? 'font-semibold text-warm-white' : ''}>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link ref={planLinkRef} href="/#plans" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] bg-sage-light text-forest hover:bg-warm-white transition-all focus-visible:ring-4 focus-visible:ring-sage-light/60">
                  <span>Find My Plan</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}