import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { generateW9Pdf } from '@/lib/pdf';
import { markAsPaid } from '@/lib/db';

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData, email } = await req.json();

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("CRITICAL: RAZORPAY_KEY_SECRET is not set in environment variables.");
      return NextResponse.json({ error: "Server configuration error: Payment keys missing." }, { status: 500 });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid Razorpay signature. Generated:", generatedSignature, "Received:", razorpay_signature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Mark as paid in DB — fire-and-forget so DB issues don't block PDF delivery
    if (formData.formId) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      markAsPaid(formData.formId, email, ip).catch(dbErr => {
        console.error("DB markAsPaid failed (non-blocking):", dbErr.message);
      });
    }

    // Payment is verified! Generate the Clean, Final PDF.
    const pdfData = { 
      ...formData, 
      isDraft: false,
      address: formData.street,
      cityStateZip: `${formData.city}, ${formData.state} ${formData.zip}`
    };
    const pdfBytes = await generateW9Pdf(pdfData);

    // Return the PDF as a downloadable blob
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Completed_W9_Form.pdf"',
      }
    });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Verification failed: " + (error.message || String(error)) }, { status: 500 });
  }
}
