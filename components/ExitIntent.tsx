'use client';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useToast } from './ToastProvider';

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);
  const triggered = useRef(false);
  const toast = useToast();

  useEffect(() => {
    if (show) return;
    const onScroll = () => {
      if (triggered.current || dismissed.current) return;
      const max = document.body.scrollHeight - window.innerHeight;
      if (window.scrollY / Math.max(1, max) > 0.6) {
        triggered.current = true;
        setTimeout(() => setShow(true), 1500);
      }
    };
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current && !dismissed.current && window.scrollY > 400) {
        triggered.current = true;
        setShow(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [show]);

  const close = () => { setShow(false); dismissed.current = true; };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, goal: 'Help me choose a plan', source: 'exit-intent' }),
      });
      if (!res.ok) throw new Error();
      toast("Got it — we'll help you choose the right plan.");
      close();
      form.reset();
    } catch {
      toast('Something went wrong — please try WhatsApp.');
    }
  };

  return (
    <div className={`exit-slide-up ${show ? 'show' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] tracking-[0.22em] uppercase text-sage-dark font-semibold mb-1">Not sure which plan fits?</div>
          <h4 className="font-display text-lg text-forest-deep">Let Sakshi help you choose.</h4>
        </div>
        <button onClick={close} className="text-sage-dark hover:text-forest -mt-1 -mr-1 p-1" aria-label="Close">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input name="name" type="text" placeholder="Your name" required className="input-field flex-1" style={{ padding: '10px 12px', fontSize: '14px' }} />
        <input name="phone" type="tel" placeholder="Phone" required className="input-field flex-1" style={{ padding: '10px 12px', fontSize: '14px' }} />
        <button type="submit" className="cta-primary px-5 rounded-full text-sm whitespace-nowrap">Help Me Choose →</button>
      </form>
    </div>
  );
}