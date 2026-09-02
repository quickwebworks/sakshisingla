export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '916280766101';
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
  bestSuitedFor?: string[];
  recommendation?: string;
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
    name: '12-Week Transformation Program',
    price: 9999,
    priceLabel: '₹9,999',
    period: '₹3,333/month',
    originalPrice: 11997,
    saveBadge: 'Save ₹1,998',
    description: 'This is the program I usually recommend for proper, visible and sustainable results.',
    features: [
      'Personalized nutrition plan',
      'Weekly check-ins & progress tracking',
      'Regular plan adjustments',
      'Habit & lifestyle correction',
      'WhatsApp support & guidance',
      'Accountability throughout the journey',
    ],
    cta: 'Start My Transformation',
    badge: 'Most Popular',
    popular: true,
    bestSuitedFor: [
      'Fat loss & inch loss',
      'PCOS / Thyroid management',
      'Gut health improvement',
      'Better relationship with food',
      'Lifestyle & habit transformation',
    ],
    recommendation: 'Recommended if you want deeper and long-lasting transformation.',
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

export const STAY_ACCOUNTABLE: Plan = {
  id: 'stay-accountable',
  name: 'Stay Accountable',
  price: 1499,
  priceLabel: '₹1,499/month',
  description: '2 follow-up calls + accountability + minor plan adjustments.',
  cta: 'Continue My Journey',
  badge: 'Existing Clients Only',
  features: [
    '2 follow-up calls',
    'Accountability support',
    'Minor plan adjustments',
  ],
};

export const MYSTERY_OPTIONS = [
  { id: 'weight', title: 'Weight Management', desc: 'Sustainable weight management with muscle support — no crash diets, no rebound.', icon: 'scale' },
  { id: 'pcos', title: 'PCOS Nutrition', desc: 'Nutrition patterns that support insulin sensitivity and hormonal balance.', icon: 'hormone' },
  { id: 'diabetes', title: 'Diabetes Nutrition', desc: 'Blood-sugar-aware eating through real food and practical choices.', icon: 'pulse' },
  { id: 'thyroid', title: 'Thyroid Nutrition', desc: 'Nutrition support for Hyper/Hypo conditions, energy and metabolic wellbeing.', icon: 'pulse' },
  { id: 'gut', title: 'Gut & Digestive Health', desc: 'Personalised nutrition for better digestion, comfort and regularity.', icon: 'heart' },
  { id: 'liver', title: 'Liver Health Nutrition', desc: 'Food-first nutrition support for fatty liver and metabolic health.', icon: 'pulse' },
  { id: 'heart', title: 'Heart & Cholesterol Nutrition', desc: 'Heart-supportive eating without complicated food rules.', icon: 'heart' },
  { id: 'kidney', title: 'Kidney Nutrition', desc: 'Personalised nutrition adapted to kidney function and medical needs.', icon: 'pulse' },
  { id: 'skin-hair', title: 'Skin & Hair Nutrition', desc: 'Nourishment from within to support healthier skin and hair.', icon: 'sparkle' },
  { id: 'maternal', title: 'Maternal Nutrition', desc: 'Trimester-wise nourishment for mother and baby — nausea, cravings and aversions covered.', icon: 'heart' },
  { id: 'paediatric', title: 'Paediatric Nutrition', desc: 'Growth-supporting meals that work even with picky eaters.', icon: 'heart' },
  { id: 'sports', title: 'Sports Nutrition', desc: 'Fuelling and recovery strategies matched to your training.', icon: 'dumbbell' },
  { id: 'midlife', title: 'Perimenopause & Menopause', desc: 'Nutrition for changing metabolism, muscle, bone and appetite through midlife.', icon: 'hormone' },
  { id: 'family', title: 'Family & Couple Plans', desc: 'Different goals, one kitchen — nutrition that works for the whole household.', icon: 'heart' },
  { id: 'meal-planning', title: 'Personalised Meal Planning', desc: 'Meals built around your cuisine, kitchen, calendar and budget.', icon: 'utensils' },
  { id: 'lifestyle', title: 'Lifestyle Counselling', desc: 'Habit building and accountability that outlast motivation.', icon: 'bolt' },
  { id: 'corporate', title: 'Corporate Nutrition & Wellness', desc: 'Practical nutrition education for healthier, more energised workplaces.', icon: 'layers' },
] as const;

export const MYSTERY_STRATEGIES: Record<string, { title: string; subtitle: string; points: string[]; image?: string }> = {
  weight: {
    title: 'Weight Management',
    subtitle: 'Sustainable weight management with muscle support — no crash diets, no rebound.',
    points: [
      'Weight loss, healthy weight gain & breaking plateaus',
      'Eating patterns & appetite signals',
      'Metabolism, sleep & stress interplay',
    ],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
  },
  pcos: { title: 'PCOS Nutrition', subtitle: 'Nutrition patterns that support insulin sensitivity and hormonal balance.', points: ['Cycle-aware nutrition', 'Blood sugar and cravings support', 'Energy, sleep and stress habits'], image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80' },
  diabetes: { title: 'Diabetes Nutrition', subtitle: 'Blood-sugar-aware eating through real food and practical choices.', points: ['Balanced meals for steadier readings', 'Food choices that fit your routine', 'Progress tracking and practical guidance'], image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80' },
  thyroid: { title: 'Thyroid Nutrition', subtitle: 'Nutrition support for Hyper/Hypo conditions, energy and metabolic wellbeing.', points: ['Condition-aware nutrition support', 'Energy and metabolism habits', 'Practical meals for your routine'], image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85' },
  gut: { title: 'Gut & Digestive Health', subtitle: 'Personalised nutrition for better digestion, comfort and regularity.', points: ['Identify food and symptom patterns', 'Comfort-focused meal strategies', 'Support for regularity and routine'], image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85' },
  liver: { title: 'Liver Health Nutrition', subtitle: 'Food-first nutrition support for fatty liver and metabolic health.', points: ['Metabolic health support', 'Balanced, liver-friendly meals', 'Sustainable lifestyle changes'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eeed?auto=format&fit=crop&w=1200&q=85' },
  heart: { title: 'Heart & Cholesterol Nutrition', subtitle: 'Heart-supportive eating without complicated food rules.', points: ['Heart-supportive food choices', 'Practical cholesterol-aware meals', 'Simple habits for long-term wellbeing'] },
  kidney: { title: 'Kidney Nutrition', subtitle: 'Personalised nutrition adapted to kidney function and medical needs.', points: ['Nutrition adapted to your needs', 'Medical-context meal guidance', 'Clear, practical food choices'] },
  'skin-hair': { title: 'Skin & Hair Nutrition', subtitle: 'Nourishment from within to support healthier skin and hair.', points: ['Nutrient-rich meal planning', 'Lifestyle support for healthy growth', 'Personalised guidance for your goals'] },
  maternal: { title: 'Maternal Nutrition', subtitle: 'Trimester-wise nourishment for mother and baby — nausea, cravings and aversions covered.', points: ['Trimester-wise nutrition support', 'Practical help for nausea and cravings', 'Nourishment for mother and baby'] },
  paediatric: { title: 'Paediatric Nutrition', subtitle: 'Growth-supporting meals that work even with picky eaters.', points: ['Growth-focused meal planning', 'Picky-eater friendly strategies', 'Family routines that feel achievable'] },
  sports: { title: 'Sports Nutrition', subtitle: 'Fuelling and recovery strategies matched to your training.', points: ['Training and recovery nutrition', 'Strength-supportive meal planning', 'Hydration and performance habits'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80' },
  midlife: { title: 'Perimenopause & Menopause', subtitle: 'Nutrition for changing metabolism, muscle, bone and appetite through midlife.', points: ['Support for changing metabolism', 'Muscle and bone supportive meals', 'Appetite and energy strategies'] },
  family: { title: 'Family & Couple Plans', subtitle: 'Different goals, one kitchen — nutrition that works for the whole household.', points: ['Plans for different health goals', 'One-kitchen meal strategies', 'Flexible support for the household'] },
  'meal-planning': { title: 'Personalised Meal Planning', subtitle: 'Meals built around your cuisine, kitchen, calendar and budget.', points: ['Cuisine and kitchen-aware meals', 'Planning for your calendar', 'Practical choices for your budget'] },
  lifestyle: { title: 'Lifestyle Counselling', subtitle: 'Habit building and accountability that outlast motivation.', points: ['Small, sustainable habit changes', 'Accountability that fits real life', 'Tools to build lasting consistency'] },
  corporate: { title: 'Corporate Nutrition & Wellness', subtitle: 'Practical nutrition education for healthier, more energised workplaces.', points: ['Engaging workplace education', 'Healthy, practical routines', 'Support for energised teams'] },
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
  {
    id: '004',
    goal: 'Weight Management',
    challenge: 'Unstructured eating',
    progress: 'A consistent meal rhythm, better portions and more confidence around food.',
    quote: 'The plan felt practical from day one. I could follow it with my work schedule and still enjoy my meals.',
    name: 'Priya M.',
    location: 'Delhi, India',
    avatar: 'https://picsum.photos/seed/client-priya/80/80.jpg',
    duration: '10 weeks',
  },
  {
    id: '005',
    goal: 'PCOS / Hormonal Health',
    challenge: 'Cravings and irregular routine',
    progress: 'More balanced meals, improved energy and a routine that feels easier to maintain.',
    quote: 'Sakshi helped me understand my patterns instead of making me feel guilty about them. That changed everything.',
    name: 'Kavya S.',
    location: 'Bengaluru, India',
    avatar: 'https://picsum.photos/seed/client-kavya/80/80.jpg',
    duration: '12 weeks',
  },
  {
    id: '006',
    goal: 'Low Energy & Lifestyle',
    challenge: 'Afternoon fatigue',
    progress: 'Steadier energy throughout the day and fewer skipped or rushed meals.',
    quote: 'I stopped relying on quick fixes. The small changes made my days feel noticeably lighter and more manageable.',
    name: 'Neha T.',
    location: 'Pune, India',
    avatar: 'https://picsum.photos/seed/client-neha/80/80.jpg',
    duration: '6 weeks',
  },
  {
    id: '007',
    goal: 'Sports Nutrition',
    challenge: 'Recovery and meal timing',
    progress: 'Stronger training sessions, improved recovery and a clearer fueling routine.',
    quote: 'I finally understood how to fuel training without overcomplicating my meals. The guidance was clear and easy to apply.',
    name: 'Arjun K.',
    location: 'Chandigarh, India',
    avatar: 'https://picsum.photos/seed/client-arjun/80/80.jpg',
    duration: '8 weeks',
  },
  {
    id: '008',
    goal: 'General Wellness',
    challenge: 'Building consistency',
    progress: 'More home-cooked meals, improved planning and sustainable daily habits.',
    quote: 'This was the first approach that worked with my real life. I learned how to make better choices without aiming for perfection.',
    name: 'Rhea D.',
    location: 'Singapore',
    avatar: 'https://picsum.photos/seed/client-rhea/80/80.jpg',
    duration: '8 weeks',
  },
  {
    id: '009',
    goal: 'Weight Management',
    challenge: 'Plateau and low motivation',
    progress: 'A renewed routine, better appetite awareness and steady progress without extreme restriction.',
    quote: 'The process was patient and personal. I learned what my body needed instead of chasing another short-term diet.',
    name: 'Simran J.',
    location: 'Amritsar, India',
    avatar: 'https://picsum.photos/seed/client-simran/80/80.jpg',
    duration: '14 weeks',
  },
  {
    id: '010',
    goal: 'Diabetes Nutrition',
    challenge: 'Meal planning and blood sugar swings',
    progress: 'More balanced meals, improved tracking confidence and steadier daily readings.',
    quote: 'Everything was explained clearly and connected to food I already eat. I feel much more in control of my routine now.',
    name: 'Vikram P.',
    location: 'Kolkata, India',
    avatar: 'https://picsum.photos/seed/client-vikram/80/80.jpg',
    duration: '10 weeks',
  },
];

export const TRUST_POINTS = [
  { icon: 'layers', title: 'Personalized Nutrition', desc: 'Plans designed around your lifestyle — not someone else\'s routine.' },
  { icon: 'flask', title: 'Science-Informed', desc: 'Practical nutritional guidance grounded in real evidence.' },
  { icon: 'utensils', title: 'Real-Life Food', desc: 'No unrealistic meal routines — food that fits your kitchen.' },
  { icon: 'shield', title: 'Accountability', desc: 'Support that helps you stay consistent when life gets busy.' },
];