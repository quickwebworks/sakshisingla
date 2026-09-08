import type { MetadataRoute } from 'next';

const publicRoutes = [
  '/',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cancellation-and-refund-policy',
  '/shipping-and-delivery-policy',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'yearly',
    priority: route === '/' ? 1 : 0.3,
  }));
}