import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { ToastProvider } from '@/components/ToastProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Dietitian Sakshi Singla — Decode Your Health Mystery',
  description: 'Personalized nutrition designed around your lifestyle, habits and health goals. Decode your health mystery with Dietitian Sakshi Singla.',
  keywords: ['dietitian', 'nutritionist', 'PCOS diet', 'weight management', 'personalized nutrition plan'],
  openGraph: {
    title: 'Dietitian Sakshi Singla — Decode Your Health Mystery',
    description: 'Personalized nutrition designed around your lifestyle, habits and real-life routine.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}