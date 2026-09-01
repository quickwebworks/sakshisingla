'use client';
import { useEffect, useRef } from 'react';

export default function InvestigationLine() {
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(100, (window.scrollY / Math.max(1, max)) * 100));
      if (progressRef.current) progressRef.current.style.height = pct + '%';
      if (indicatorRef.current) indicatorRef.current.style.top = pct + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="investigation-line" aria-hidden="true">
      <div className="progress" ref={progressRef} />
      <div className="indicator" ref={indicatorRef} />
      <div className="marker" style={{ top: '12%' }}><span className="marker-label">Clue</span></div>
      <div className="marker" style={{ top: '38%' }}><span className="marker-label">Investigate</span></div>
      <div className="marker" style={{ top: '64%' }}><span className="marker-label">Plan</span></div>
      <div className="marker" style={{ top: '88%' }}><span className="marker-label">Transform</span></div>
    </div>
  );
}