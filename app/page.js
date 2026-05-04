import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import VersionCheck from '@/components/VersionCheck';

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

const FAQ_ITEMS = [
  {
    q: 'What is a W-9 form and who needs to fill one out?',
    a: 'A W-9 (Request for Taxpayer Identification Number and Certification) is an IRS form used in the United States. Independent contractors, freelancers, sole proprietors, and vendors are typically asked to fill one out by clients or companies that pay them $600 or more per year. The form collects your legal name, tax classification, address, and TIN (SSN or EIN) so that the payer can issue you a 1099 at tax time.'
  },
  {
    q: 'Is my data secure? Do you store my SSN or EIN?',
    a: 'Absolutely not. We maintain a strict Zero-Data-Storage policy. Your Social Security Number (SSN) or Employer Identification Number (EIN) is processed entirely within your browser using 256-bit encryption. It is never transmitted to or stored on our servers. Even if our servers were compromised, there would be zero sensitive data to steal.'
  },
  {
    q: 'How long does it take to fill out a W-9 form?',
    a: 'Most users complete their W-9 in under 2 minutes using our guided wizard. Our step-by-step interface walks you through each field with clear instructions, IRS hints, and real-time validation — eliminating the guesswork that makes the official PDF confusing.'
  },
  {
    q: 'Can I edit my W-9 after downloading?',
    a: 'The downloaded PDF is a finalized, IRS-ready document. If you need to make changes, simply fill out a new form — your progress is saved locally in your browser, so most fields will be pre-filled. Since we charge a one-time fee per generated document, a new form requires a new payment.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment partner Razorpay. All transactions are protected by SSL encryption and PCI-DSS compliance. We never see or store your payment card details.'
  },
  {
    q: 'Is this the official IRS W-9 form?',
    a: 'Yes. Our tool generates the exact same Form W-9 (Rev. October 2018) that the IRS publishes on irs.gov. The only difference is that we auto-fill it for you based on your inputs, so you avoid common mistakes like wrong entity types, nickname usage, or incorrect TIN formats.'
  },
  {
    q: 'Do you offer refunds?',
    a: 'Due to the instant, digital nature of our service (the PDF is generated and delivered immediately), we do not offer refunds once the document has been downloaded. If you experience a technical issue preventing download, please contact easywform@gmail.com and we will resolve it promptly.'
  },
  {
    q: 'Can I fill out a W-9 on my phone?',
    a: 'Yes! EasyW9Form is fully responsive and works on smartphones, tablets, and desktops. Our mobile-friendly wizard makes it easy to fill your W-9 from anywhere — no app download required.'
  },
];

export default function Home() {

  return (
    <>
      <VersionCheck />
      {/* ===== HERO ===== */}
      <section className="hero bg-dot-pattern" style={{ background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(219, 234, 254, 0.95) 30%, rgba(240, 253, 250, 0.95) 70%, rgba(248, 250, 252, 0.95) 100%)', paddingTop: '48px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div className="hero-blob" style={{ width: '500px', height: '500px', background: 'rgba(37, 99, 235, 0.12)', top: '-200px', right: '-100px' }} />
        <div className="hero-blob" style={{ width: '300px', height: '300px', background: 'rgba(139, 92, 246, 0.1)', bottom: '-100px', left: '-50px' }} />
        <div className="container hero-grid">
          <div>
            <div className="hero-badge" style={{ animation: 'pulse-soft 2s infinite', background: '#DCFCE7', color: '#14532D', border: '1px solid #BBF7D0' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z"/></svg>
              100% IRS Compliant & Secure
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Get Your W-9 in 2 Minutes. <br className="hide-mobile" />
              No Signups, No Data Storage. <br className="hide-mobile" />
              <span className="gradient-text">Just a Perfect PDF.</span>
            </h1>
            <p
              className="hero-subtitle"
              style={{
                margin: "0 auto 24px 0",
                maxWidth: "600px",
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              Trusted by 10,000+ freelancers. Don't let a messy W-9 delay your client payment.
            </p>
            <div className="hero-buttons" style={{ marginBottom: '16px' }}>
              <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg" style={{ padding: '18px 40px', fontSize: '17px', borderRadius: '14px' }}>
                Start Filling Now →
              </Link>
              <a href="#how-it-works" className="btn btn-outline btn-lg" style={{ padding: '18px 32px' }}>
                See How It Works
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                  <span style={{ color: '#059669', fontSize: '18px' }}>✔</span> 256-bit Encrypted
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                  <span style={{ color: '#059669', fontSize: '18px' }}>✔</span> No Data Stored
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                  <span style={{ color: '#059669', fontSize: '18px' }}>✔</span> Trusted by 10,000+ Users
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', opacity: 0.8 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by professionals at:</span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>Upwork</span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>Toptal</span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>Fiverr</span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>Deel</span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>Rippling</span>
              </div>
            </div>
          </div>
          <div className="hide-mobile" style={{ position: 'relative' }}>
             <div style={{ 
               background: 'white', 
               borderRadius: 'var(--radius-lg)', 
               padding: '0', 
               boxShadow: 'var(--shadow-premium)', 
               transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
               animation: 'float 6s ease-in-out infinite',
               overflow: 'hidden'
             }}>
               {/* Top Bar (Purely Visual) */}
               <div style={{ background: '#1E293B', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                   <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                   <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                   <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                 </div>
                 <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600 }}>easyw9form.com</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                   <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse-soft 1.5s infinite' }} />
                   <span style={{ color: '#10B981', fontSize: 10, fontWeight: 700 }}>LIVE</span>
                 </div>
               </div>

               {/* Hero Image for SEO and Visuals */}
               <img 
                 src="/hero-preview.png" 
                 alt="EasyW9Form Interface — Secure Online W-9 Form Filler with Live Preview" 
                 style={{ width: '100%', height: 'auto', display: 'block' }} 
               />
             </div>
           </div>
          </div>
      </section>

      {/* ===== SECURITY & PRIVACY (TRUST) ===== */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: '#EFF6FF', color: '#1E40AF', padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🔒</span> Your Data is Safe With Us
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, marginBottom: '24px', maxWidth: '800px', letterSpacing: '-0.01em' }}>
            Military-grade security for your <span className="gradient-text">most sensitive</span> information.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', width: '100%', marginTop: '28px' }}>
            {[
              { icon: '🛡️', title: 'Zero-Storage Policy', desc: 'We do NOT store your SSN, EIN, or address. Once your document is generated, the sensitive data is wiped from memory.' },
              { icon: '🔐', title: '256-bit Encryption', desc: 'All data is processed in-browser using bank-grade encryption. Your sensitive details never leave your local machine unencrypted.' },
              { icon: '💳', title: 'Secure Checkout', desc: 'Payments are handled via Razorpay. We never see or store your credit card or banking information.' },
              { icon: '📄', title: 'Official & Compliant', desc: 'Our templates are the exact official IRS Form W-9. Trusted by CPAs and legal professionals across the US.' }
            ].map((item, i) => (
              <div key={i} className="security-card" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR (Moved Above Fold) ===== */}
      {/* Keeping empty for structure, logos moved to hero */}

      {/* ===== HOW IT WORKS ===== */}
      <section className="section section-light bg-grid-pattern" id="how-it-works" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <div className="section-label">How It Works</div>
            <h2 className="section-title">Fill out your W-9 form in three simple steps</h2>
            <p className="section-desc">
              No learning curve. Answer a few questions and get your IRS-ready W-9 PDF instantly.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card glass-panel">
              <div className="step-number">1</div>
              <h3>Scan or Enter Details</h3>
              <p>Upload a photo of your ID or old W-9 and our Gemini AI scanner extracts your data instantly. Or, use our guided wizard to type it in manually.</p>
            </div>
            <div className="step-card glass-panel">
              <div className="step-number">2</div>
              <h3>Live PDF Preview</h3>
              <p>Watch your official W-9 form generate in real-time as you complete each step. See exactly how it looks before you download.</p>
            </div>
            <div className="step-card glass-panel" style={{ border: '2px solid var(--primary-light)' }}>
              <div className="step-number">3</div>
              <h3>Sign & Download</h3>
              <p>Sign digitally (Type, Draw, or Upload), pay once ($3.99), and get your clean, IRS-ready PDF delivered instantly to your email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY EASYW9FORM ===== */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Why Us?</div>
            <h2 className="section-title">The smartest way to fill W-9 forms online</h2>
            <p className="section-desc">
              Designed for freelancers who need to get paid today.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '28px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', background: '#F8FAFC' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔒</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Privacy-First</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>We never store your SSN or EIN. It's encrypted in your browser and deleted the moment you download.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', background: '#F8FAFC' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Zero Errors</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Our AI verifies your inputs against IRS rules. No 'Return to sender' requests from accounting teams.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', background: '#F8FAFC' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📄</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Client-Ready</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Professional, clean, and 100% accepted by major platforms like Upwork, Deel, and Rippling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF & PRICING ===== */}
      <section className="section section-gray" id="pricing" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="split-section-grid">
            
            {/* Left: Social Proof & Benefits */}
            <div>
              <div className="section-header" style={{ textAlign: 'left', maxWidth: 'none', margin: '0 0 32px' }}>
                <div className="section-label">Trust & Excellence</div>
                <h2 className="section-title">Built for serious freelancers & contractors</h2>
                <p className="section-desc">
                  Security isn&apos;t a feature, it&apos;s our foundation.
                </p>
              </div>
              
              <div className="glass-panel" style={{ marginBottom: '32px', padding: '32px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '100px', color: 'rgba(37, 99, 235, 0.05)', lineHeight: 1 }}>"</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: '18px' }}>★</span>)}
                  <span style={{ fontSize: '15px', fontWeight: 700, marginLeft: '8px', color: '#1E293B' }}>4.9/5 from 2,000+ users</span>
                </div>
                <p style={{ fontStyle: 'italic', color: '#334155', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                  "I was terrified of making a mistake on my EIN for a new client. EasyW9 guided me through the classification questions and I had a perfect PDF in literally 60 seconds."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-light), #E0E7FF)', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>JD</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Jason D.</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Senior Contractor</div>
                  </div>
                </div>
              </div>

              <div className="benefits-grid" style={{ gridTemplateColumns: '1fr', gap: '12px' }}>
                <div className="benefit-item">
                  <div className="benefit-icon">🔒</div>
                  <span>Bank-grade 256-bit encryption</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🛡️</div>
                  <span>No SSN/EIN stored — ever</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✅</div>
                  <span>Instant IRS-compliance check</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📱</div>
                  <span>Works on any device — phone, tablet, or desktop</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing */}
            <div>
              <div className="section-header" style={{ textAlign: 'left', maxWidth: 'none', margin: '0 0 32px' }}>
                <div className="section-label">Pricing</div>
                <h2 className="section-title">One-time payment. Forever yours.</h2>
                <p className="section-desc">
                  No subscriptions. No hidden fees. Pay once for a perfect document.
                </p>
              </div>
              <div className="pricing-card" style={{ margin: 0, width: '100%', boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)', border: '2px solid var(--primary)', position: 'relative', background: 'linear-gradient(to bottom, #ffffff, #F8FAFC)' }}>
                <div className="pricing-badge" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', color: '#FFFFFF', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}>⚡ Limited-Time Launch Price</div>
                <div className="pricing-amount">$3<span>.99</span></div>
                <p className="pricing-desc">
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginRight: '8px' }}>$4.99</span>
                  Save 20% — one-time payment per document.
                </p>
                <div className="pricing-features">
                  <div className="pricing-feature" style={{ padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Guided W-9 Wizard</span>
                       <span style={{ fontSize: '12px', color: '#64748B' }}>Step-by-step instructions</span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#14532D', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800 }}>FREE</span>
                  </div>
                  <div className="pricing-feature" style={{ padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Live PDF Preview</span>
                       <span style={{ fontSize: '12px', color: '#64748B' }}>See it before you pay</span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#14532D', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800 }}>FREE</span>
                  </div>
                  <div className="pricing-feature" style={{ padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>IRS Validation</span>
                       <span style={{ fontSize: '12px', color: '#64748B' }}>Error-free guarantee</span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#14532D', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800 }}>FREE</span>
                  </div>
                  <div className="pricing-feature" style={{ padding: '14px 0', borderBottom: '2px solid #E2E8F0', background: '#F8FAFC', margin: '0 -24px', paddingLeft: '24px', paddingRight: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>Final W-9 Download</span>
                       <span style={{ fontSize: '12px', color: '#64748B' }}>Official, clean, IRS PDF</span>
                    </div>
                    <span style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 900 }}>$3.99</span>
                  </div>
                </div>
                <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg" style={{ width: '100%', background: 'var(--primary)', color: 'white', padding: '20px', borderRadius: '12px', fontSize: '17px', fontWeight: 800 }}>
                  Fill My W-9 Now →
                </Link>
                <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                   <span>🔒</span> Secure Razorpay Checkout · One-time only
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section-light" id="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Frequently Asked Questions</div>
            <h2 className="section-title">Everything you need to know about W-9 forms</h2>
            <p className="section-desc">
              Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, email us at easywform@gmail.com.
            </p>
          </div>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-blob" style={{ background: 'rgba(255, 255, 255, 0.2)', width: 400, height: 400, top: -100, left: -100 }} />
        <div className="hero-blob" style={{ background: 'rgba(255, 255, 255, 0.15)', width: 300, height: 300, bottom: -50, right: -50 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Ready to fill your W-9 form?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Join thousands of freelancers who trust EasyW9Form. Takes less than 2 minutes.
          </p>
          <Link href="/fill-w9-form-online" className="btn btn-lg cta-btn" style={{ background: 'white', color: 'var(--primary-dark)', fontWeight: 800, borderRadius: '100px', padding: '20px 48px', fontSize: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' }}>
            Fill My W-9 Now — Only $3.99 →
          </Link>
        </div>
      </section>

      {/* ===== COMING SOON (FUTURE GROWTH) ===== */}
      <section className="section" style={{ background: '#0F172A', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'var(--primary-light)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', marginBottom: '16px' }}>Expansion 2026</div>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>More automation <span style={{ color: 'var(--primary-light)' }}>on the way.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
                We&apos;re expanding our &quot;Zero-Storage&quot; automation tools to help you manage your business paperwork without the privacy risks.
              </p>
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { title: 'I-9 Form Generator', status: 'In Development' },
                  { title: 'Rental Agreement Builder', status: 'Coming Q3' },
                  { title: 'UK Self-Assessment Tools', status: 'Planning' }
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{item.title}</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '100px', color: 'var(--primary-light)' }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Get notified on launch</h3>
               <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Be the first to know when we release new free tools and official forms.</p>
               <div style={{ display: 'flex', gap: '10px' }}>
                 <input type="email" placeholder="Enter your email" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 20px', borderRadius: '10px', color: 'white', outline: 'none' }} />
                 <button className="btn btn-primary" style={{ padding: '0 24px' }}>Join Waitlist</button>
               </div>
               <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>
                 🔒 We value your privacy. No spam, ever.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT & W-9 GUIDE ===== */}
      <section className="section seo-section" style={{ background: '#f8fafc', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Knowledge Base</div>
            <h2 className="section-title">W-9 Form Resources & Information</h2>
            <p className="section-desc">
              Everything you need to know about the IRS Request for Taxpayer Identification Number and Certification.
            </p>
          </div>

          <div className="split-section-grid" style={{ gap: '32px' }}>
            {/* Card 1 */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  📄
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>What is a W-9 Form?</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                A W-9 form is an official IRS document used in the US. When you work as an independent contractor or freelancer, clients need your W-9 to report payments to you on a 1099 form. It collects your legal name, business classification, and TIN (SSN or EIN).
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0FDF4', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  💻
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>How to Fill It Out Online</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Filling out a W-9 requires your name exactly as it appears on your tax return, the correct federal tax classification, and your TIN. Our guided W-9 form filler eliminates formatting errors by walking you through each field with real-time validation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  ⚠️
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Common Mistakes to Avoid</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                The most frequent error is using a nickname or DBA on Line 1 instead of your legal tax name. Incorrect entity types (like checking "C Corp" for a single-member LLC) or TIN formats can cause issues. Our tool automatically flags these errors.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FAF5FF', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  ⚡
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Download Instantly</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Generate a completed, IRS-ready W-9 PDF in under two minutes. Your information is processed securely using 256-bit encryption and never stored on our servers. Download a professionally filled W-9 ready to submit to any client.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
