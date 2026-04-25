import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("CRITICAL: Razorpay keys are not set in environment variables.");
      return NextResponse.json({ error: "Server configuration error: Payment keys missing." }, { status: 500 });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { formId, email } = await req.json();

    const options = {
      amount: 399, // $3.99
      currency: "USD",
      receipt: "receipt_order_" + Date.now(),
      notes: {
        formId: formId || 'unknown',
        email: email || 'unknown'
      }
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
