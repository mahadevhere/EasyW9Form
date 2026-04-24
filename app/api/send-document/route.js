import { NextResponse } from 'next/server';

const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY;
const BCC_EMAIL = process.env.BCC_EMAIL || 'easywform@gmail.com';
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://easyw9form.com';

/**
 * Send professional status emails via Mailjet v3.1 API.
 * No PDF attachments — just status + website link.
 * 
 * type: 'started' | 'success' | 'failed'
 */
export async function POST(req) {
  try {
    const { email, formData = {}, type = 'success' } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const name = formData.name || 'there';
    const formUrl = `${SITE_URL}/fill-w9-form-online`;

    // Build email content based on type
    let subject, bodyHtml;

    if (type === 'started') {
      subject = '📝 Your W-9 Form is Almost Ready! — EasyW9Form';
      bodyHtml = buildEmailTemplate({
        greeting: `Hi ${name},`,
        mainText: `You've started filling your W-9 form with <strong>EasyW9Form</strong>. You're just one step away from getting your official, IRS-ready PDF document.`,
        highlightBox: {
          title: '🎉 Limited-Time Offer',
          text: 'Get your completed W-9 for just <strong>$3.99</strong> <span style="text-decoration:line-through;color:#94a3b8;">$4.99</span> — Instant download, zero data stored.',
        },
        ctaText: 'Continue Filling Your W-9 →',
        ctaUrl: formUrl,
        footerNote: 'Complete your payment to download the final, clean PDF without watermarks.',
      });
    } else if (type === 'failed') {
      subject = '⚠️ Your W-9 Payment Needs Attention — EasyW9Form';
      bodyHtml = buildEmailTemplate({
        greeting: `Hi ${name},`,
        mainText: `We noticed your payment could not be completed. <strong>Don't worry</strong> — your form progress is saved locally in your browser, and you can try again anytime.`,
        highlightBox: {
          title: '💳 Payment Issue',
          text: 'Your payment was not processed. No charges have been applied to your account.',
        },
        ctaText: 'Try Again — Complete Your W-9 →',
        ctaUrl: formUrl,
        footerNote: 'If you continue to experience issues, please contact us at <a href="mailto:support@easyw9form.com" style="color:#2563eb;">support@easyw9form.com</a>.',
      });
    } else {
      // success
      subject = '✅ Your W-9 Form is Ready! — EasyW9Form';
      bodyHtml = buildEmailTemplate({
        greeting: `Hi ${name},`,
        mainText: `Your payment was <strong>successful</strong> and your official IRS W-9 form has been generated! 🎉 You can download it directly from your browser. If you closed the tab, you can fill a new form anytime.`,
        highlightBox: {
          title: '✅ Payment Confirmed',
          text: `<strong>Status:</strong> Paid & Delivered<br/><strong>Document:</strong> IRS Form W-9 (Official PDF)<br/><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        },
        ctaText: 'Fill Another W-9 Form →',
        ctaUrl: formUrl,
        footerNote: 'Your document was delivered via instant browser download. We do not store your sensitive data (SSN/EIN) on our servers.',
      });
    }

    // Mailjet v3.1 Send API
    const mailjetPayload = {
      Messages: [
        {
          From: { Email: 'easywform@gmail.com', Name: 'EasyW9Form' },
          To: [{ Email: email, Name: name }],
          // Bcc: [{ Email: BCC_EMAIL, Name: 'EasyW9Form Admin' }], // Enable after domain setup
          Subject: subject,
          HTMLPart: bodyHtml,
        },
      ],
    };

    const authHeader = Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64');

    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(mailjetPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailjet Error:', errorText);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 });
    }

    // Update delivery status in DB — fire-and-forget so email flow isn't blocked by DB issues
    import('@/lib/db').then(({ updateDeliveryStatus }) => {
      if (formData.formId) {
        const statusMap = { started: 'Lead Email Sent', success: 'Confirmation Sent', failed: 'Failure Notice Sent' };
        updateDeliveryStatus(formData.formId, statusMap[type] || 'Email Sent').catch(dbErr => {
          console.error('DB updateDeliveryStatus failed (non-blocking):', dbErr.message);
        });
      }
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email API Error:', error.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * Builds a professional HTML email template
 */
function buildEmailTemplate({ greeting, mainText, highlightBox, ctaText, ctaUrl, footerNote }) {
  return `
    <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 36px 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">EasyW9Form</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; font-weight: 500;">The fastest way to fill IRS-ready W-9 forms</p>
      </div>
      
      <!-- Body -->
      <div style="padding: 40px 32px;">
        <p style="font-size: 16px; font-weight: 600; margin-top: 0; color: #0f172a;">${greeting}</p>
        <p style="font-size: 15px; color: #475569; line-height: 1.7;">${mainText}</p>
        
        <!-- Highlight Box -->
        ${highlightBox ? `
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px 24px; margin: 28px 0;">
          <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #0369a1;">${highlightBox.title}</p>
          <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">${highlightBox.text}</p>
        </div>
        ` : ''}
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="${ctaUrl}" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 16px 40px; border-radius: 10px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.35);">
            ${ctaText}
          </a>
        </div>
        
        <!-- Footer Note -->
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
          ${footerNote}
        </p>
        
        <!-- Privacy Badge -->
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 20px; padding: 12px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
          <span style="font-size: 16px;">🔒</span>
          <span style="font-size: 12px; color: #64748b;"><strong>Zero-Data-Storage Policy:</strong> Your SSN/EIN is processed in-browser and never stored on our servers.</span>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} EasyW9Form. All rights reserved.
        </p>
        <p style="margin: 0; font-size: 11px; color: #cbd5e1;">
          <a href="${ctaUrl.replace('/fill-w9-form-online', '/privacy')}" style="color: #94a3b8; text-decoration: underline;">Privacy Policy</a> · 
          <a href="${ctaUrl.replace('/fill-w9-form-online', '/terms')}" style="color: #94a3b8; text-decoration: underline;">Terms of Service</a> · 
          <a href="mailto:support@easyw9form.com" style="color: #94a3b8; text-decoration: underline;">Contact Support</a>
        </p>
        <p style="margin: 12px 0 0; font-size: 10px; color: #cbd5e1;">
          EasyW9Form is not affiliated with or endorsed by the IRS or any government agency.
        </p>
      </div>
    </div>
  `;
}
