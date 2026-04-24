import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — EasyW9Form',
  description: 'Read the terms of service for EasyW9Form, the secure online W-9 form generator.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: 120, paddingBottom: 80, maxWidth: 800 }}>
      <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 12 }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 40, fontSize: 15 }}>
        <strong>Effective Date:</strong> April 20, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> April 20, 2026
      </p>
      
      <div style={{ lineHeight: 1.8, fontSize: '15px' }}>

        <p>Please read these Terms of Service (&quot;Terms&quot;) carefully before using EasyW9Form (&quot;the Service,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, please do not use our Service.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>1. Service Description</h2>
        <p>EasyW9Form provides an automated, web-based tool to assist users in completing IRS Form W-9 (Request for Taxpayer Identification Number and Certification). Our Service includes:</p>
        <ul>
          <li>A guided step-by-step wizard to fill in W-9 form fields</li>
          <li>Real-time PDF preview of your completed form</li>
          <li>Generation and instant download of the final, IRS-ready PDF document</li>
          <li>Optional document scanning (OCR) to auto-fill fields from uploaded documents</li>
        </ul>
        <p><strong>Important:</strong> EasyW9Form is NOT a law firm, accounting firm, tax advisory service, or registered tax preparer. Our Service does not constitute legal, tax, or financial advice. We provide document automation software only.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>2. Eligibility</h2>
        <p>You must be at least 18 years old to use this Service. By using EasyW9Form, you represent and warrant that you have the legal capacity to enter into these Terms and that you are using the Service for lawful purposes only.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>3. User Responsibilities</h2>
        <ul>
          <li><strong>Accuracy of Information:</strong> You are solely responsible for the accuracy, completeness, and truthfulness of all information you enter into the W-9 form. You certify that the Taxpayer Identification Number (TIN) you provide is correct and that you are not subject to backup withholding unless otherwise indicated.</li>
          <li><strong>Lawful Use:</strong> You agree to use this Service only for lawful purposes. You shall not use EasyW9Form to create fraudulent, false, or misleading tax documents.</li>
          <li><strong>Compliance:</strong> You are responsible for ensuring that your completed W-9 form complies with all applicable IRS regulations and requirements.</li>
        </ul>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>4. Payments & Pricing</h2>
        <ul>
          <li>Payment is required to download the final, clean (unwatermarked) W-9 PDF document.</li>
          <li>Prices are displayed at checkout and are subject to change without prior notice.</li>
          <li>All payments are one-time fees per generated document. There are no recurring charges or subscriptions.</li>
          <li>Payments are processed securely by <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. We do not store your credit card or banking information.</li>
          <li>All prices are listed in US Dollars (USD).</li>
        </ul>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>5. Refund Policy</h2>
        <p>Due to the instant, digital nature of our Service:</p>
        <ul>
          <li><strong>All sales are final.</strong> Once a clean PDF has been generated and made available for download, no refunds will be issued.</li>
          <li>If you experience a <strong>technical issue</strong> that prevents you from downloading your document (e.g., server error, PDF corruption), please contact us within 48 hours at <a href="mailto:support@easyw9form.com" style={{ color: 'var(--primary)' }}>support@easyw9form.com</a> and we will either resolve the issue or issue a full refund at our discretion.</li>
          <li>Refunds will NOT be provided for: user errors in form data, change of mind after download, duplicate purchases, or dissatisfaction with the content of the form (which is based on your own inputs).</li>
        </ul>
        <p>For full details, see our <Link href="/refund" style={{ color: 'var(--primary)' }}>Refund Policy</Link>.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>6. Intellectual Property</h2>
        <p>The EasyW9Form brand, logo, website design, software code, and all associated content are the intellectual property of EasyW9Form and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works from our Service without prior written consent.</p>
        <p>The IRS Form W-9 itself is a public domain government form. Our tool helps you fill it out — we do not claim ownership of the form template.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>7. Disclaimer of Warranties</h2>
        <p>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The Service will meet your specific requirements</li>
          <li>The Service will be uninterrupted, timely, or error-free</li>
          <li>The generated documents will be accepted by any specific recipient or government agency</li>
          <li>The results obtained from the Service will be accurate (accuracy depends on information you provide)</li>
        </ul>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>8. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, EASYW9FORM AND ITS OWNERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</p>
        <ul>
          <li>Loss of profits, revenue, or data</li>
          <li>Penalties, interest, or fines imposed by the IRS or any tax authority</li>
          <li>Legal costs or damages arising from the use of documents generated by our Service</li>
          <li>Errors or omissions in the generated W-9 form resulting from inaccurate user inputs</li>
        </ul>
        <p>Our total liability for any claim arising from the use of our Service shall not exceed the amount you paid for the specific transaction giving rise to the claim.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>9. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless EasyW9Form and its owners, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) inaccurate information you provide; or (d) your violation of any law or the rights of a third party.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>10. Privacy</h2>
        <p>Your use of the Service is also governed by our <Link href="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>, which describes our data collection, use, and security practices. We maintain a strict Zero-Data-Storage policy for sensitive taxpayer information.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>11. Modifications to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Material changes will be posted on this page with an updated effective date. Your continued use of the Service after changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>12. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved through good-faith negotiation, and if necessary, through binding arbitration in a mutually agreed-upon jurisdiction.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>13. Severability</h2>
        <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>

        <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>14. Contact Us</h2>
        <p>
          For questions about these Terms of Service, please contact us at:<br />
          <strong>Email:</strong> <a href="mailto:support@easyw9form.com" style={{ color: 'var(--primary)' }}>support@easyw9form.com</a><br />
          <strong>Business:</strong> EasyW9Form
        </p>
      </div>

      <div style={{ marginTop: 60, display: 'flex', gap: '12px' }}>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
        <Link href="/privacy" className="btn btn-outline">Privacy Policy</Link>
        <Link href="/refund" className="btn btn-outline">Refund Policy</Link>
      </div>
    </div>
  );
}
