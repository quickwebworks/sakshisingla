'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, Activity, Zap, Dumbbell, Heart, Droplet, Sparkles, UtensilsCrossed, Layers, ArrowRight, ChevronDown } from 'lucide-react';
import { MYSTERY_OPTIONS, MYSTERY_STRATEGIES } from '@/lib/constants';

const icons = {
  scale: Scale, hormone: Droplet, pulse: Activity, bolt: Zap, dumbbell: Dumbbell, heart: Heart, sparkle: Sparkles, utensils: UtensilsCrossed, layers: Layers,
};

export default function HealthMystery() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .line-block');
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    setActive((current) => current === id ? null : id);
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-7xl mx-auto">
          {MYSTERY_OPTIONS.map((opt, i) => {
            const Icon = icons[opt.icon as keyof typeof icons];
            const selected = active === opt.id;
            const strategy = MYSTERY_STRATEGIES[opt.id];
            return (
              <div key={opt.id} className={selected ? 'sm:col-span-2 lg:col-span-3' : ''}>
                <button
                  onClick={() => handleSelect(opt.id)}
                  aria-pressed={selected}
                  aria-expanded={selected}
                  aria-controls={`service-details-${opt.id}`}
                  className={`mystery-card w-full rounded-2xl p-6 text-left ${selected ? 'active' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mystery-icon w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={20} className="text-forest" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-xl font-medium mb-1.5">{opt.title}</h3>
                        <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${selected ? 'rotate-180 text-sage-light' : 'text-sage-dark'}`} aria-hidden="true" />
                      </div>
                      <p className="mystery-desc text-sm text-charcoal-soft">{opt.desc}</p>
                    </div>
                  </div>
                </button>

                {selected && (
                  <div id={`service-details-${opt.id}`} className="relative mt-4" aria-label={`${strategy?.title} details`}>
                    <div className="rounded-3xl bg-forest text-warm-white overflow-hidden shadow-2xl md:grid md:grid-cols-[1fr_1.15fr] md:text-left">
                      {strategy?.image && (
                        <div className="relative min-h-64 md:min-h-full">
                          <Image
                            src={strategy.image}
                            alt={strategy.title}
                            fill
                            sizes="(max-width: 767px) 100vw, 42vw"
                            className="object-cover object-center"
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

                        <Link href="/#plans" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] bg-sage-light text-forest hover:bg-warm-white transition-all focus-visible:ring-4 focus-visible:ring-sage-light/60">
                          <span>Find My Plan</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
