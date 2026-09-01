'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';
import { whatsappLink } from '@/lib/constants';

export default function FinalCTA() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .line-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-peach-soft overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-peach/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sage/15 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="kicker mb-5">Final Step</div>
            <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl leading-[1] tracking-[-0.02em] text-forest-deep mb-6">
              <span className="line-block"><span>Ready To </span><span className="italic font-light text-forest">Decode</span></span>
              <span className="line-block"><span>Your Health?</span></span>
            </h2>
            <p className="text-charcoal-soft text-base lg:text-lg leading-relaxed mb-9 max-w-md">
              Your next step doesn't need to be complicated. Start with a conversation and discover the nutrition plan that fits your life.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-5">
              <Link href="/#plans" className="cta-primary inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]">
                <span>Start My Health Case</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <a href={whatsappLink('Hi Sakshi, I saw your website and want to start my health case.')} target="_blank" rel="noopener" className="cta-wa inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>
                <span>WhatsApp Sakshi</span>
              </a>
            </div>
            <Link href="/#plans" className="arrow-link text-sm text-sage-dark">Book ₹999 Consultation</Link>
          </div>
          <div className="reveal delay-2">
            <div className="bg-warm-white rounded-3xl p-7 lg:p-9 shadow-2xl border border-sage/30">
              <div className="text-[10px] tracking-[0.25em] uppercase text-sage-dark font-semibold mb-2">Help Me Choose</div>
              <h3 className="font-display text-2xl lg:text-3xl text-forest-deep mb-1.5">Not sure which plan fits?</h3>
              <p className="text-sm text-charcoal-soft mb-6">Leave your details — Sakshi will personally reach out and help you decide.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}