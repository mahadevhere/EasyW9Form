import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { markAsPaid } from '@/lib/db';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text(); // Get raw body for signature verification
    const signature = req.headers.get('x-razorpay-signature');

    if (!WEBHOOK_SECRET) {
      console.error("RAZORPAY_WEBHOOK_SECRET is not set in environment variables.");
      return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error("Invalid Razorpay Webhook Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("Razorpay Webhook Event Received:", event.event);

    /**
     * Handle 'payment.captured' or 'order.paid'
     * 'order.paid' is triggered when the entire order amount is captured.
     */
    if (event.event === 'order.paid' || event.event === 'payment.captured') {
      const payload = event.payload.payment ? event.payload.payment.entity : event.payload.order.entity;
      
      // Notes are stored in order.notes if it was an order event, or payment.notes
      const notes = payload.notes || {};
      const formId = notes.formId;
      const email = notes.email || payload.email;

      if (formId && email && formId !== 'unknown') {
        console.log(`Webhook: Updating payment status for Form: ${formId}, Email: ${email}`);
        await markAsPaid(formId, email);
      } else {
        console.warn("Webhook: Payment received but missing formId or email in notes", notes);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
