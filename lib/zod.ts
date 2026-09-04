import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name too short').max(80),
  phone: z.string().min(7, 'Invalid phone').max(20),
  email: z.string().email('Invalid email'),
  goal: z.string().min(2),
  source: z.string().optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createOrderSchema = z.object({
  plan: z.enum(['consultation', 'transformation', 'monthly', 'stay-accountable']),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  plan: z.string(),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
});

export const clientLoginSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(7).max(20),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;