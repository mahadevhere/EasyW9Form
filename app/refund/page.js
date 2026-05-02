import LegalLayout from '@/components/LegalLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy — EasyW9Form',
  description: 'Learn about EasyW9Form\'s refund policy. All sales are final for digital PDF downloads.',
  alternates: { canonical: '/refund' },
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="April 20, 2026">
      <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#DC2626', fontSize: '14px' }}>
          ⚠️ All sales are final. Due to the instant, digital nature of our service, refunds are not available once a PDF has been generated and made available for download.
        </p>
      </div>

      <h2>1. No-Refund Policy</h2>
      <p>EasyW9Form provides an <strong>instant digital product</strong> — a completed IRS Form W-9 PDF generated from information you provide. Because the product is delivered immediately upon payment and cannot be &quot;returned,&quot; <strong>all sales are final and non-refundable</strong>.</p>
      <p>By making a purchase, you acknowledge and agree that:</p>
      <ul>
        <li>The PDF is generated and delivered instantly upon successful payment</li>
        <li>You had the opportunity to preview your form (with watermark) before purchasing</li>
        <li>The content of the generated PDF is based solely on information you provided</li>
        <li>You will not be eligible for a refund after the document has been generated</li>
      </ul>

      <h2>2. Exceptions — When We May Issue a Refund</h2>
      <p>In the following <strong>limited circumstances</strong>, we may issue a full or partial refund at our sole discretion:</p>
      
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '20px 24px', margin: '20px 0' }}>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Technical Failure:</strong> If a server error, bug, or technical malfunction prevented you from downloading your PDF after payment, and we are unable to resolve the issue within 48 hours.</li>
          <li style={{ marginBottom: '8px' }}><strong>Duplicate Payment:</strong> If you were accidentally charged more than once for the same form generation. Contact us with your transaction IDs for verification.</li>
          <li><strong>Corrupted Document:</strong> If the generated PDF is corrupted or unreadable due to a system error (not due to browser/device compatibility).</li>
        </ul>
      </div>

      <h2>3. What Is NOT Eligible for a Refund</h2>
      <ul>
        <li><strong>Change of mind</strong> after the PDF has been generated or downloaded</li>
        <li><strong>User errors</strong> — incorrect name, address, SSN/EIN, or tax classification entered by you</li>
        <li><strong>Dissatisfaction with the form content</strong> — the W-9 is a standard IRS form; we cannot modify the form&apos;s structure or fields</li>
        <li><strong>Inability to use the form</strong> — if a recipient rejects your W-9 for reasons unrelated to our Service</li>
        <li><strong>Failure to download</strong> — if you closed your browser before downloading and did not save the file (note: you can re-generate from the same session)</li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <p>If you believe you qualify for a refund under the exceptions listed above:</p>
      <ol>
        <li>Email us at <a href="mailto:easywform@gmail.com" style={{ color: 'var(--primary)' }}>easywform@gmail.com</a> within <strong>48 hours</strong> of your purchase</li>
        <li>Include your <strong>email address</strong> used during checkout and <strong>transaction ID</strong> (from your payment confirmation)</li>
        <li>Describe the issue in detail, including any error messages or screenshots</li>
      </ol>
      <p>We aim to respond to all refund requests within <strong>2 business days</strong>. If approved, refunds will be processed to the original payment method within 5–10 business days, depending on your bank or payment provider.</p>

      <h2>5. Chargebacks & Disputes</h2>
      <p>Filing a chargeback or payment dispute without first contacting us at easywform@gmail.com is a violation of these terms. We reserve the right to contest fraudulent chargebacks and may suspend access to our Service for users who file unwarranted disputes.</p>

      <h2>6. Contact Us</h2>
      <p>
        For refund requests or billing questions:<br />
        <strong>Email:</strong> <a href="mailto:easywform@gmail.com" style={{ color: 'var(--primary)' }}>easywform@gmail.com</a><br />
        <strong>Response Time:</strong> Within 2 business days
      </p>
    </LegalLayout>
  );
}
