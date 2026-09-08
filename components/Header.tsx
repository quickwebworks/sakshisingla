'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { whatsappLink } from '@/lib/constants';
import { Menu, X, ArrowRight, Star } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = [
    { label: 'Home', href: '/#hero' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Plans', href: '/#plans' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header className={`sticky-header fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'h-16 lg:h-20' : 'h-16 lg:h-20'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center">
              <Star size={14} className="text-warm-white" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-medium text-forest">Sakshi Singla</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-sage-dark font-medium">
                Dietitian · Clinical Nutrition
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-sm">
            {navItems.map((n) => (
              <Link key={n.href} href={n.href} className="text-charcoal-soft hover:text-forest transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#contact" className="hidden sm:inline-flex cta-primary px-5 py-2.5 rounded-full text-sm items-center gap-2">
              <span>Start My Case</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <button onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center text-forest" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`mobile-menu lg:hidden ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        aria-expanded={open}
      >
        <div className="mobile-menu-inner p-6 h-full flex flex-col">
          <div className="flex justify-end mb-12">
            <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center text-forest" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 text-2xl font-display text-forest">
            {navItems.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 border-b border-sage/30">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3">
            <Link href="/#contact" onClick={() => setOpen(false)} className="cta-primary block w-full py-4 rounded-full text-center font-medium">
              Start My Case
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="cta-wa block w-full py-4 rounded-full text-center">
              WhatsApp Sakshi
            </a>
          </div>
        </div>
      </div>
    </>
  );
}