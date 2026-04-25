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

    const options = {
      amount: 399, // amount in the smallest currency unit (cents), so 3.99 USD = $3.99? Wait. Razorpay default currency is usually INR. Let's strictly use USD.
      currency: "USD",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
