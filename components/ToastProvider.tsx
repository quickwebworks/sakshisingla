'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);

  const showToast = useCallback((m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 4000);
  }, []);

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className={`toast ${msg ? 'show' : ''}`} role="status" aria-live="polite">
        <CheckCircle2 size={16} />
        <span>{msg}</span>
      </div>
    </ToastCtx.Provider>
  );
}