import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = typeof body.razorpay_order_id === 'string' ? body.razorpay_order_id : '';
    if (!orderId) return NextResponse.json({ error: 'Order is required' }, { status: 400 });

    const { error } = await supabaseAdmin
      .from('payments')
      .update({ status: 'failed' })
      .eq('razorpay_order_id', orderId)
      .eq('status', 'created');

    if (error) return NextResponse.json({ error: 'Could not update payment' }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid payment failure payload' }, { status: 400 });
  }
}
