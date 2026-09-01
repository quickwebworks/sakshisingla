import Link from 'next/link';
import { Star, Mail, Instagram, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-deep text-warm-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-sage-light flex items-center justify-center">
                <Star size={14} className="text-forest" fill="currentColor" />
              </div>
              <div className="font-display text-lg font-medium">Dietitian Sakshi Singla</div>
            </div>
            <p className="font-display italic text-xl text-sage-light mb-6">Decode. Understand. Improve.</p>
            <p className="text-sm text-warm-white/60 max-w-sm leading-relaxed">Personalized nutrition consulting for real lives, real kitchens and real goals. Available worldwide.</p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.25em] uppercase text-sage-light font-semibold mb-4">Navigate</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#plans" className="text-warm-white/70 hover:text-sage-light transition-colors">Plans</Link></li>
              <li><Link href="/#how-it-works" className="text-warm-white/70 hover:text-sage-light transition-colors">How It Works</Link></li>
              <li><Link href="/#about" className="text-warm-white/70 hover:text-sage-light transition-colors">About Sakshi</Link></li>
              <li><Link href="/#contact" className="text-warm-white/70 hover:text-sage-light transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-sage-light font-semibold mb-4">Connect</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href={whatsappLink()} target="_blank" rel="noopener" className="text-warm-white/70 hover:text-sage-light transition-colors inline-flex items-center gap-2"><MessageCircle size={14} /> WhatsApp Sakshi</a></li>
              <li><a href="https://instagram.com/dietitian_sakshi" target="_blank" rel="noopener" className="text-warm-white/70 hover:text-sage-light transition-colors inline-flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
              <li><a href="mailto:hello@sakshisingla.com" className="text-warm-white/70 hover:text-sage-light transition-colors inline-flex items-center gap-2"><Mail size={14} /> hello@sakshisingla.com</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-warm-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-warm-white/50">
          <div>© {year} Dietitian Sakshi Singla. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="#" className="hover:text-sage-light transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-sage-light transition-colors">Terms</Link>
            <Link href="#" className="hover:text-sage-light transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
        <div className="mt-6 text-[11px] text-warm-white/40 leading-relaxed max-w-3xl">
          <strong className="text-warm-white/60 font-medium">Medical Disclaimer:</strong> Information provided by Dietitian Sakshi Singla is for educational purposes only and is not a substitute for professional medical advice, diagnosis or treatment. Always consult your physician before making significant changes to your nutrition, especially if you have a medical condition.
        </div>
      </div>
    </footer>
  );
}