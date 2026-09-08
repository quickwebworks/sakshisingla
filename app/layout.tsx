import './globals.css';
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ToastProvider';
import Analytics from '@/components/Analytics';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Dietitian Sakshi Singla — Decode Your Health Mystery',
  description: 'Personalized nutrition designed around your lifestyle, habits and health goals. Decode your health mystery with Dietitian Sakshi Singla.',
  keywords: ['dietitian', 'nutritionist', 'PCOS diet', 'weight management', 'personalized nutrition plan'],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
        : {}),
    },
  },
  openGraph: {
    title: 'Dietitian Sakshi Singla — Decode Your Health Mystery',
    description: 'Personalized nutrition designed around your lifestyle, habits and real-life routine.',
    type: 'website',
    url: siteUrl,
    siteName: 'Dietitian Sakshi Singla',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}