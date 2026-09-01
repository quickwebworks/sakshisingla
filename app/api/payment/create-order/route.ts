import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { createOrderSchema } from '@/lib/zod';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PLANS } from '@/lib/constants';
import { inrToPaise } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    const planId = parsed.data.plan;
    const plan = PLANS.find((p) => p.id === planId)
      ?? (planId === 'stay-accountable' ? { id: 'stay-accountable', name: 'Stay Accountable', price: 1499 } : null);
    if (!plan) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });

    const amountPaise = inrToPaise(plan.price);

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { plan: planId, plan_name: plan.name },
    });

    // Persist order
    await supabaseAdmin.from('payments').insert({
      razorpay_order_id: order.id,
      plan: plan.name,
      amount_paise: amountPaise,
      status: 'created',
      metadata: { plan_id: planId },
    });

    return NextResponse.json({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: amountPaise,
      currency: 'INR',
      plan_name: plan.name,
    });
  } catch (err) {
    console.error('Create order error:', err);
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }
}