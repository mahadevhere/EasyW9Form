import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div>
            <div className="footer-brand">EasyW9Form</div>
            <p className="footer-text">
              The fastest way to fill and download IRS-ready W-9 forms online. 
              No signup, no data stored, no hassle. Trusted by freelancers and 
              contractors worldwide.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <Link href="/fill-w9-form-online" className="footer-link">Fill W-9 Online</Link>
            <Link href="/#how-it-works" className="footer-link">How It Works</Link>
            <Link href="/#pricing" className="footer-link">Pricing</Link>
            <Link href="/#faq" className="footer-link">FAQ</Link>
          </div>
          <div>
            <h4>Guides</h4>
            <Link href="/guides/how-to-fill-w9" className="footer-link">How to Fill W-9</Link>
            <Link href="/guides/tax-difference-w9-vs-w4" className="footer-link">W-9 vs W-4</Link>
            <Link href="/guides/w9-for-independent-contractors" className="footer-link">Freelancer's Guide</Link>
            <Link href="/guides/secure-w9-generation" className="footer-link">Security Guide</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
            <Link href="/refund" className="footer-link">Refund Policy</Link>
            <Link href="mailto:support@easyw9form.com" className="footer-link">Contact Support</Link>
          </div>
        </div>
        <div className="footer-bottom" style={{ flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
            <span>© {new Date().getFullYear()} EasyW9Form. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/privacy" className="footer-link" style={{ padding: 0 }}>Privacy</Link>
              <Link href="/terms" className="footer-link" style={{ padding: 0 }}>Terms</Link>
              <Link href="/refund" className="footer-link" style={{ padding: 0 }}>Refunds</Link>
              <Link href="mailto:support@easyw9form.com" className="footer-link" style={{ padding: 0 }}>Support</Link>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            Disclaimer: EasyW9Form is a private document automation tool and is not affiliated with, endorsed by, or representing the Internal Revenue Service (IRS) or any government agency. We provide software to help you fill forms correctly. This is not tax advice.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.6 }}>
            <span style={{ fontSize: '11px' }}>🔒 SSL Secure Checkout</span>
            <span style={{ fontSize: '11px' }}>🛡️ Zero-Data-Storage Policy</span>
            <span style={{ fontSize: '11px' }}>⚡ Instant PDF Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
