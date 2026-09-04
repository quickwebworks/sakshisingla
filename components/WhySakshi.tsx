'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, FlaskConical, UtensilsCrossed, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRUST_POINTS } from '@/lib/constants';

const icons = { layers: Layers, flask: FlaskConical, utensils: UtensilsCrossed, shield: ShieldCheck };

export default function WhySakshi() {
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

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-warm-white overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-96 h-96 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image src="/images/dietitian-in-ludhiana.jpg" alt="Dietitian and founder Sakshi Singla" width={600} height={750} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-3 lg:-right-8 glass-card rounded-2xl px-5 py-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-sage-dark font-semibold mb-1">Dietitian & Founder</div>
                <div className="font-display text-xl text-forest-deep italic">Sakshi Singla</div>
              </div>
              <div className="absolute -top-4 -left-3 lg:-left-8 glass-card rounded-2xl px-4 py-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=100&h=100&q=80" alt="Healthy meal planning" className="w-7 h-7 rounded-full object-cover border-2 border-warm-white" />
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=100&h=100&q=80" alt="Wellness and fitness support" className="w-7 h-7 rounded-full object-cover border-2 border-warm-white" />
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=100&h=100&q=80" alt="Mindful lifestyle support" className="w-7 h-7 rounded-full object-cover border-2 border-warm-white" />
                </div>
                <span className="text-xs text-charcoal-soft font-medium">262+ served</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal delay-2">
            <div className="kicker mb-5">Why Sakshi</div>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.02em] text-forest-deep mb-7">
              No Generic Diet Charts.<br />
              <span className="italic font-light text-forest">Every Case Is Different.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-7 mb-9">
              {TRUST_POINTS.map((p) => {
                const Icon = icons[p.icon as keyof typeof icons];
                return (
                  <div key={p.title} className="border-t border-sage/30 pt-4">
                    <div className="w-9 h-9 rounded-lg bg-sage-light/40 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-forest" />
                    </div>
                    <h3 className="font-display text-lg font-medium text-forest-deep mb-1.5">{p.title}</h3>
                    <p className="text-sm text-charcoal-soft">{p.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mb-7 pb-7 border-b border-sage/30">
              <div>
                <div className="font-display text-3xl font-medium text-forest leading-none">6+</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-sage-dark font-semibold mt-1">Years Experience</div>
              </div>
              <div className="w-px h-10 bg-sage/40" />
              <div>
                <div className="font-display text-3xl font-medium text-forest leading-none">262+</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-sage-dark font-semibold mt-1">International Clients</div>
              </div>
            </div>
            <Link href="/#contact" className="arrow-link text-base">
              Talk To Sakshi
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
