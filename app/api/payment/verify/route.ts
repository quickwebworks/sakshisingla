import { NextResponse } from 'next/server';
import { verifyPaymentSchema } from '@/lib/zod';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendPaymentConfirmationEmail } from '@/lib/resend';
import { paiseToInr } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = verifyPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = parsed.data;

    const valid = verifyRazorpaySignature(
      razorpay_order_id, razorpay_payment_id, razorpay_signature
    );
    if (!valid) {
      return NextResponse.json({ error: 'Signature mismatch' }, { status: 400 });
    }

    // Update payment record
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'paid',
        verified_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('id, amount_paise')
      .single();

    if (!payment) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const amount = paiseToInr(payment.amount_paise);

    // Optional: create client record (if you collect name/email at checkout)
    // We expect the checkout page to also submit name/email — extend schema as needed.

    // Send confirmation email (if email available)
    // sendPaymentConfirmationEmail({ name, email, plan, amount }).catch(console.error);

    return NextResponse.json({ ok: true, amount, plan });
  } catch (err) {
    console.error('Verify payment error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}