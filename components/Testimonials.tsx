'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement;
    const cardWidth = card.offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }, [index]);

  return (
    <section className="relative py-20 lg:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="kicker mb-5 justify-center inline-flex">Section 04 — Proof</div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-forest-deep">
            <span className="line-block"><span>Cases That Turned Into </span><span className="italic font-light text-forest">Progress</span></span>
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
            <div ref={trackRef} className="flex gap-6 transition-transform duration-700 ease-out" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              {TESTIMONIALS.map((t, i) => (
                <article key={t.id} className={`flex-shrink-0 w-[85vw] sm:w-[440px] reveal delay-${i + 1}`}>
                  <div className="bg-warm-white rounded-3xl p-7 lg:p-8 h-full border border-sage/30 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <span className="case-stamp">Case #{t.id} — Closed</span>
                      <span className="text-[10px] text-sage-dark font-medium">{t.duration}</span>
                    </div>
                    <div className="space-y-2.5 mb-6 pb-6 border-b border-sage/30">
                      <div className="flex gap-2 text-sm"><span className="text-sage-dark font-medium w-20 shrink-0">Goal:</span><span className="text-charcoal-soft">{t.goal}</span></div>
                      <div className="flex gap-2 text-sm"><span className="text-sage-dark font-medium w-20 shrink-0">Challenge:</span><span className="text-charcoal-soft">{t.challenge}</span></div>
                      <div className="flex gap-2 text-sm"><span className="text-sage-dark font-medium w-20 shrink-0">Progress:</span><span className="text-charcoal-soft">{t.progress}</span></div>
                    </div>
                    <p className="font-display text-lg italic leading-relaxed text-forest-deep mb-5">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-sage">
                        <Image src={t.avatar} alt={`${t.name} portrait`} width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-forest-deep">{t.name}</div>
                        <div className="text-[11px] text-sage-dark">{t.location}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    background: i === index ? 'var(--forest)' : 'rgba(126,144,111,0.4)',
                    width: i === index ? '20px' : '6px',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIndex((i) => Math.max(0, i - 1))} className="w-10 h-10 rounded-full border border-sage hover:border-forest hover:bg-forest hover:text-warm-white text-forest transition-all flex items-center justify-center" aria-label="Previous testimonial">
                <ArrowLeft size={16} strokeWidth={2.5} />
              </button>
              <button onClick={() => setIndex((i) => Math.min(TESTIMONIALS.length - 1, i + 1))} className="w-10 h-10 rounded-full border border-sage hover:border-forest hover:bg-forest hover:text-warm-white text-forest transition-all flex items-center justify-center" aria-label="Next testimonial">
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/#contact" className="cta-primary inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]">
              <span>Start My Own Journey</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}