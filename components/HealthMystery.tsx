'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scale, Activity, Zap, Dumbbell, Heart, Droplet, ArrowRight } from 'lucide-react';
import { MYSTERY_OPTIONS, MYSTERY_STRATEGIES } from '@/lib/constants';

const icons = {
  scale: Scale, hormone: Droplet, pulse: Activity, bolt: Zap, dumbbell: Dumbbell, heart: Heart,
};

export default function HealthMystery() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
    setVisible(!!active && active !== id ? false : !active);
  };

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
                className={`mystery-card reveal delay-${i + 1} rounded-2xl p-6 text-left ${active === opt.id ? 'active' : ''}`}
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

        <div className={`max-w-3xl mx-auto mt-12 lg:mt-16 transition-all duration-700 ease-out ${active ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="relative">
            <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-12 pointer-events-none" viewBox="0 0 240 48">
              <path d="M10 5 Q 120 -5 230 5" stroke="#7E906F" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.5" />
            </svg>
            <div className="rounded-3xl bg-forest text-warm-white p-8 lg:p-10 text-center shadow-2xl">
              <div className="text-[11px] tracking-[0.25em] uppercase text-sage-light font-semibold mb-3">Your Personalized Nutrition Strategy</div>
              <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-4">{strategy?.title}</h3>
              <p className="text-sage-light/80 text-sm mb-6 max-w-lg mx-auto">{strategy?.desc}</p>
              <Link href="/#plans" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] bg-sage-light text-forest hover:bg-warm-white transition-all">
                <span>Find My Plan</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}