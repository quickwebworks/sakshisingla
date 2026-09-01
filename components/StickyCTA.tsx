'use client';
import Link from 'next/link';
import { whatsappLink } from '@/lib/constants';

export default function StickyCTA() {
  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a href={whatsappLink('Hi Sakshi, I saw your website.')} target="_blank" rel="noopener" className="float-wa" aria-label="WhatsApp Sakshi">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z"/>
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/>
        </svg>
      </a>

      {/* Mobile bottom bar */}
      <div className="mobile-bottom-bar lg:hidden">
        <a href={whatsappLink('Hi Sakshi, I saw your website.')} target="_blank" rel="noopener" className="cta-wa py-3 rounded-full text-sm flex items-center justify-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>
          WhatsApp
        </a>
        <Link href="/#plans" className="cta-primary py-3 rounded-full text-sm flex items-center justify-center gap-1.5">
          <span>Book Consultation</span>
        </Link>
      </div>
    </>
  );
}