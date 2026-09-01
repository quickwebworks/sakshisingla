export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210';
export const whatsappLink = (msg?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

export interface Plan {
  id: 'consultation' | 'transformation' | 'monthly' | 'stay-accountable';
  name: string;
  price: number;       // INR
  priceLabel: string;
  period?: string;
  popular?: boolean;
  originalPrice?: number;
  saveBadge?: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'consultation',
    name: 'Nutrition Consultation',
    price: 999,
    priceLabel: '₹999',
    description: '30–40 minute one-to-one consultation',
    features: [
      'Nutrition & lifestyle assessment',
      'Goal discussion',
      'Initial recommendations',
      'Recommendation for your best plan',
    ],
    cta: 'Book Consultation',
    badge: 'Start Here',
  },
  {
    id: 'transformation',
    name: '90-Day Transformation',
    price: 9999,
    priceLabel: '₹9,999',
    period: '₹3,333/month',
    originalPrice: 11997,
    saveBadge: 'Save ₹1,998',
    description: 'Three months of guided, accountable change.',
    features: [
      'Personalized nutrition plan',
      'Weekly follow-ups',
      'Regular adjustments',
      'Progress tracking',
      'Lifestyle coaching',
      'Accountability & WhatsApp guidance',
    ],
    cta: 'Start My Transformation',
    badge: 'Most Popular',
    popular: true,
  },
  {
    id: 'monthly',
    name: '30-Day Personalized Plan',
    price: 3999,
    priceLabel: '₹3,999',
    description: 'A focused month to test the waters.',
    features: [
      'Personalized nutrition plan',
      'Weekly follow-ups',
      'Progress review',
      'Plan modifications',
      'WhatsApp guidance',
    ],
    cta: 'Start My 30-Day Plan',
    badge: 'Flexible Start',
  },
];

export const STAY_ACCOUNTABLE = {
  id: 'stay-accountable' as const,
  name: 'Stay Accountable',
  price: 1499,
  priceLabel: '₹1,499/month',
  description: '2 follow-up calls + accountability + minor plan adjustments.',
  cta: 'Continue My Journey',
  badge: 'Existing Clients Only',
};

export const MYSTERY_OPTIONS = [
  { id: 'weight', title: 'Weight Management', desc: 'Sustainable loss or gain without crash diets.', icon: 'scale' },
  { id: 'pcos', title: 'PCOS / Hormonal Health', desc: 'Balance hormones through targeted nutrition.', icon: 'hormone' },
  { id: 'diabetes', title: 'Diabetes Nutrition', desc: 'Stable blood sugar through real food.', icon: 'pulse' },
  { id: 'energy', title: 'Low Energy & Lifestyle', desc: 'Rebuild steady energy across the day.', icon: 'bolt' },
  { id: 'sports', title: 'Sports Nutrition', desc: 'Performance fuel for serious training.', icon: 'dumbbell' },
  { id: 'general', title: 'General Wellness', desc: 'Feel better in your body every day.', icon: 'heart' },
] as const;

export const MYSTERY_STRATEGIES: Record<string, { title: string; desc: string }> = {
  weight: { title: 'A Weight Strategy Built Around Your Routine', desc: 'No crash diets, no impossible restrictions — just a structured, sustainable plan that fits your real life.' },
  pcos: { title: 'Hormonal Balance Through Targeted Nutrition', desc: 'Sakshi maps the patterns affecting your hormones and builds a nutrition rhythm that supports them.' },
  diabetes: { title: 'Stable Blood Sugar Through Real Food', desc: 'A clear, food-first approach to managing diabetes — practical, measurable, and sustainable.' },
  energy: { title: 'Rebuild Steady Energy Across Your Day', desc: 'We identify what\'s draining you and rebuild your nutrition rhythm to support consistent energy.' },
  sports: { title: 'Performance Fuel For Serious Training', desc: 'Targeted nutrition to support your training load, recovery and performance goals.' },
  general: { title: 'Everyday Wellness, Built Around You', desc: 'Feel better in your body — a personalized plan that supports your overall health and longevity.' },
};

export const TESTIMONIALS = [
  {
    id: '001',
    goal: 'Weight Management',
    challenge: 'Consistency',
    progress: 'Better routine, improved food choices and sustainable habits.',
    quote: 'I finally stopped fighting my own routine. Sakshi didn\'t hand me a chart — she rebuilt how I think about food, one realistic week at a time.',
    name: 'Ananya R.',
    location: 'Mumbai, India',
    avatar: 'https://picsum.photos/seed/client-ananya/80/80.jpg',
    duration: '8 weeks',
  },
  {
    id: '002',
    goal: 'PCOS / Hormonal Health',
    challenge: 'Energy crashes & cravings',
    progress: 'Stable energy through the day, fewer cravings, clearer cycle pattern.',
    quote: 'Three months in and my body finally feels like mine again. Sakshi listened to the clues I had been ignoring for years.',
    name: 'Meera K.',
    location: 'London, UK',
    avatar: 'https://picsum.photos/seed/client-meera/80/80.jpg',
    duration: '12 weeks',
  },
  {
    id: '003',
    goal: 'Diabetes Nutrition',
    challenge: 'Blood sugar spikes',
    progress: 'Stable readings, reduced medication dependency, more energy.',
    quote: 'My doctor was surprised at my last panel. Sakshi built a plan around real food I actually enjoy — no extremes, just clarity.',
    name: 'Rajesh P.',
    location: 'Dubai, UAE',
    avatar: 'https://picsum.photos/seed/client-rajesh/80/80.jpg',
    duration: '90 days',
  },
];

export const TRUST_POINTS = [
  { icon: 'layers', title: 'Personalized Nutrition', desc: 'Plans designed around your lifestyle — not someone else\'s routine.' },
  { icon: 'flask', title: 'Science-Informed', desc: 'Practical nutritional guidance grounded in real evidence.' },
  { icon: 'utensils', title: 'Real-Life Food', desc: 'No unrealistic meal routines — food that fits your kitchen.' },
  { icon: 'shield', title: 'Accountability', desc: 'Support that helps you stay consistent when life gets busy.' },
];