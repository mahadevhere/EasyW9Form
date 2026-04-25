import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Privacy Policy — EasyW9Form',
  description: 'Learn about EasyW9Form\'s zero-data-storage privacy policy. Your SSN and EIN are never stored on our servers.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 20, 2026">
      <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-light)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary)', fontSize: '14px' }}>
          🔒 TL;DR — We do NOT store your Social Security Number, EIN, or any sensitive tax data. Period. Your information is processed in your browser and discarded immediately after PDF generation.
        </p>
      </div>

      <h2>1. Zero-Data-Storage Architecture</h2>
      <p>EasyW9Form (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. We have engineered our platform with a <strong>Privacy-by-Design architecture</strong> that fundamentally cannot store sensitive user data:</p>
      <ul>
        <li><strong>Taxpayer Identification Numbers (SSN/EIN):</strong> Processed entirely within your browser&apos;s memory. Never transmitted to or stored on our servers in plain text or encrypted form.</li>
        <li><strong>Form Data (name, address, tax classification):</strong> Used in-memory solely for the purpose of generating your W-9 PDF document. Discarded immediately after generation.</li>
        <li><strong>PDF Documents:</strong> Generated server-side and delivered instantly to your browser for download. We do not retain copies of generated PDFs.</li>
      </ul>
      <p>This architecture ensures that even in the event of a data breach, there would be <strong>no sensitive taxpayer information</strong> to compromise.</p>

      <h2>2. Information We Collect</h2>
      <p>We collect only the minimum information necessary to provide our service and comply with legal obligations:</p>
      
      <h3>2.1 Information You Provide</h3>
      <ul>
        <li><strong>Email Address:</strong> Collected during checkout to send transaction confirmations. We do not sell, rent, or share your email with third parties for marketing purposes.</li>
      </ul>
      
      <h3>2.2 Automatically Collected Information</h3>
      <ul>
        <li><strong>IP Address:</strong> Logged for fraud prevention, security auditing, and abuse detection.</li>
        <li><strong>Payment Metadata:</strong> Transaction IDs, payment status, and timestamps are logged for accounting and dispute resolution. We do NOT store credit card numbers, CVVs, or banking details — all payment processing is handled by our PCI-DSS compliant payment partner, <strong>Razorpay</strong>.</li>
        <li><strong>Browser Local Storage:</strong> We use your browser&apos;s local storage to save form progress so you don&apos;t lose work if you refresh or close the tab. This data resides exclusively on your device and is never sent to our servers.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To generate and deliver your W-9 PDF document</li>
        <li>To send transactional emails (payment confirmations, delivery status)</li>
        <li>To prevent fraud and ensure platform security</li>
        <li>To comply with applicable legal and regulatory requirements</li>
      </ul>
      <p>We do <strong>NOT</strong> use your information for targeted advertising, data mining, profiling, or sale to third parties.</p>

      <h2>4. Third-Party Services</h2>
      <p>We integrate with the following third-party services, each with their own privacy policies:</p>
      <ul>
        <li><strong>Razorpay</strong> — Payment processing (<a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Razorpay Privacy Policy</a>)</li>
        <li><strong>Brevo</strong> — Transactional email delivery (<a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Brevo Privacy Policy</a>)</li>
        <li><strong>MongoDB Atlas</strong> — Database hosting for non-sensitive metadata (email, payment status, IP addresses only)</li>
      </ul>

      <h2>5. Data Security</h2>
      <ul>
        <li>All data in transit is encrypted using industry-standard <strong>256-bit TLS/SSL encryption</strong>.</li>
        <li>Sensitive form fields (SSN/EIN) are processed exclusively in your browser and are never sent to our API endpoints.</li>
        <li>Our server infrastructure is hosted on secure, SOC 2 compliant cloud platforms.</li>
        <li>Admin access is protected by secure authentication with time-limited tokens.</li>
      </ul>

      <h2>6. Cookies & Tracking</h2>
      <p>EasyW9Form does <strong>not</strong> use third-party tracking cookies, advertising pixels, or analytics tracking tools that identify individual users. We use browser local storage solely for the purpose of saving your form progress on your own device.</p>

      <h2>7. Data Retention</h2>
      <ul>
        <li><strong>Sensitive form data:</strong> Never stored. Discarded immediately.</li>
        <li><strong>Email addresses and payment metadata:</strong> Retained for up to 12 months for accounting, legal compliance, and customer support purposes, then permanently deleted.</li>
        <li><strong>IP addresses:</strong> Retained for up to 90 days for security purposes.</li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request a copy of any personal data we hold about you</li>
        <li>Request deletion of your data from our systems</li>
        <li>Opt out of future transactional emails</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:support@easyw9form.com" style={{ color: 'var(--primary)' }}>support@easyw9form.com</a>.</p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>EasyW9Form is not intended for use by individuals under the age of 18. We do not knowingly collect information from minors.</p>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our service after changes constitutes acceptance of the updated policy.</p>

      <h2>11. Contact Us</h2>
      <p>
        For privacy-related questions or concerns, please contact us at:<br />
        <strong>Email:</strong> <a href="mailto:support@easyw9form.com" style={{ color: 'var(--primary)' }}>support@easyw9form.com</a><br />
        <strong>Business:</strong> EasyW9Form
      </p>
    </LegalLayout>
  );
}
