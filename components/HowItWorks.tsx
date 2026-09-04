'use client';
import Link from 'next/link';
import { Search, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const steps = [
  { num: '01', label: 'Investigate', title: 'Understand Your Patterns', desc: 'We start with you current lifestyle, daily habits, challenges and goals- the real clues your body is giving. We need your blood work and body composition.', icon: Search },
  { num: '02', label: 'Decode', title: "Identify What's Not Working", desc: "We read the patterns — what to adjust, what to keep, we find the loop holes and find out what's been silently holding you back.", icon: CheckCircle2 },
  { num: '03', label: 'Build Your Strategy', title: 'Receive Your Personal Plan', desc: 'We build your personalized nutrition strategy and weekly habits- without rushing. deliver you your practical, customized plan with ongoing guidance, accountability, and adjustments as you progress.', icon: FileText },
];

export default function HowItWorks() {
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .line-block');
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('visible'));
      if (progressRef.current) progressRef.current.style.width = '100%';
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (progressRef.current) progressRef.current.style.width = '100%';
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -60px 0px' });
    elements.forEach((el) => obs.observe(el));
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-20 lg:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <div className="kicker mb-5 justify-center inline-flex">Section 02 — Method</div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-forest-deep">
            <span className="line-block"><span>From Clues To </span><span className="italic font-light text-forest">A Clear Plan</span></span>
          </h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="step-line hidden lg:block"><div className="step-line-progress" ref={progressRef} /></div>
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className={`reveal delay-${i + 1} text-center lg:text-left relative`}>
                  <div className="relative inline-flex lg:flex lg:justify-start mb-6">
                    <div className="w-16 h-16 rounded-full bg-warm-white border-2 border-forest flex items-center justify-center relative z-10">
                      <Icon size={22} className="text-forest" />
                    </div>
                    <div className="absolute -top-1 -right-1 lg:right-auto lg:-left-2 font-display text-xs text-sage-dark font-medium bg-warm-white px-1">{s.num}</div>
                  </div>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-sage-dark font-semibold mb-2">{s.label}</div>
                  <h3 className="font-display text-2xl lg:text-3xl text-forest-deep mb-3 leading-tight">{s.title}</h3>
                  <p className="text-charcoal-soft text-sm lg:text-[15px] leading-relaxed max-w-xs mx-auto lg:mx-0">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12 lg:mt-16 reveal">
            <Link href="/#contact" className="arrow-link text-base">
              Start My Consultation
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
