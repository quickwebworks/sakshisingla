'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Globe, Award } from 'lucide-react';
import ParticlesCanvas from './ParticlesCanvas';
import { whatsappLink } from '@/lib/constants';

const clueCards = [
  { label: 'Weight Gain', float: 'animate-float-a', position: '-top-2 -left-4 lg:-left-12', color: 'bg-peach' },
  { label: 'PCOS', float: 'animate-float-b', position: 'top-12 -right-4 lg:-right-10', color: 'bg-sage-light' },
  { label: 'Low Energy', float: 'animate-float-c', position: 'bottom-32 -left-6 lg:-left-14', color: 'bg-beige' },
  { label: 'Cravings', float: 'animate-float-d', position: 'bottom-16 -right-4 lg:-right-12', color: 'bg-peach-soft' },
  { label: 'Diabetes', float: 'animate-float-a', position: '-bottom-2 left-4 lg:left-0', color: 'bg-sage', textDark: true },
  { label: 'Hormonal Health', float: 'animate-float-b', position: 'bottom-44 -right-2 lg:-right-8', color: 'bg-peach' },
];

export default function Hero() {
  const linesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-16 lg:pt-20">
      <ParticlesCanvas />
      <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-sage/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-peach/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-12 lg:pt-16 pb-16 lg:pb-24 z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="kicker mb-6 reveal">Decode · Investigate · Transform</div>
            <h1 ref={linesRef} className="font-display text-[2.8rem] sm:text-6xl lg:text-[5.2rem] leading-[0.98] tracking-[-0.02em] text-forest-deep mb-7">
              <span className="line-block"><span>Your Body Is</span></span>
              <span className="line-block"><span>Giving You </span><span className="italic font-light text-forest">Clues.</span></span>
              <span className="line-block"><span>Let's </span><span className="italic font-light text-forest">Decode</span><span> Them.</span></span>
            </h1>
            <p className="text-base lg:text-lg text-charcoal-soft leading-relaxed max-w-xl mb-8 reveal delay-2">
              Personalized nutrition designed around your lifestyle, habits, health goals and real-life routine — not generic diet charts or unrealistic routines.
            </p>
            <div className="flex items-center gap-6 mb-9 reveal delay-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-sage/25 flex items-center justify-center">
                  <Award size={14} strokeWidth={2.5} className="text-forest" />
                </div>
                <div>
                  <div className="font-display text-xl font-medium text-forest leading-none">5+ Years</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-sage-dark font-medium mt-0.5">Experience</div>
                </div>
              </div>
              <div className="w-px h-9 bg-sage/40" />
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-sage/25 flex items-center justify-center">
                  <Globe size={14} strokeWidth={2.5} className="text-forest" />
                </div>
                <div>
                  <div className="font-display text-xl font-medium text-forest leading-none">200+</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-sage-dark font-medium mt-0.5">International Clients</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 reveal delay-4">
              <Link href="/#plans" className="cta-primary inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]">
                <span>Start My Health Case</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <a href={whatsappLink('Hi Sakshi, I saw your website and would like to know more.')} target="_blank" rel="noopener" className="cta-wa inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>
                <span>WhatsApp Sakshi</span>
              </a>
            </div>
            <Link href="/#plans" className="arrow-link text-sm text-sage-dark reveal delay-4">
              Not sure? Book a ₹999 consultation.
            </Link>
          </div>

          <div className="lg:col-span-5 relative reveal delay-2">
            <div className="relative max-w-[420px] mx-auto">
              <div className="portrait-mask aspect-[4/5] shadow-2xl relative">
                <Image src="/images/dietitian-sakshi-singla.jpg" alt="Dietitian Sakshi Singla portrait" width={600} height={750} className="w-full h-full object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/30 via-transparent to-sage/10 mix-blend-multiply" />
              </div>
              {clueCards.map((c) => (
                <div key={c.label} className={`absolute ${c.position} ${c.float}`}>
                  <div className="glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${c.color} flex items-center justify-center`}>
                      <CheckCircle size={11} strokeWidth={2.5} className={c.textDark ? 'text-forest' : 'text-forest'} />
                    </div>
                    <span className="font-display text-sm font-medium text-forest">{c.label}</span>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 -z-10 rounded-full border border-sage/30" style={{ borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%', transform: 'scale(1.08)' }} />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-20 flex items-center gap-3 reveal delay-4">
          <div className="w-px h-12 bg-gradient-to-b from-forest to-transparent" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-sage-dark font-medium">Follow the investigation</span>
        </div>
      </div>
    </section>
  );
}