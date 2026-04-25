'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

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
    a: 'Due to the instant, digital nature of our service (the PDF is generated and delivered immediately), we do not offer refunds once the document has been downloaded. If you experience a technical issue preventing download, please contact support@easyw9form.com and we will resolve it promptly.'
  },
  {
    q: 'Can I fill out a W-9 on my phone?',
    a: 'Yes! EasyW9Form is fully responsive and works on smartphones, tablets, and desktops. Our mobile-friendly wizard makes it easy to fill your W-9 from anywhere — no app download required.'
  },
];

export default function Home() {
  // Version check – clear stale session data if app version changed
  const APP_VERSION = '1.2.0';
  useEffect(() => {
    const storedVersion = sessionStorage.getItem('app_version');
    if (storedVersion !== APP_VERSION) {
      sessionStorage.clear();
      sessionStorage.setItem('app_version', APP_VERSION);
    }
  }, []);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" style={{ background: 'radial-gradient(circle at top right, var(--primary-light), transparent), var(--bg-soft)', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container hero-grid">
          <div>
            <div className="hero-badge" style={{ animation: 'pulse-soft 2s infinite' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z"/></svg>
              100% IRS Compliant & Secure
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Fill Your W-9 Form Online <br className="hide-mobile" />
              in 2 Minutes —{" "}
              <span style={{ color: "var(--primary)" }}>100% Accurate.</span>
            </h1>
            <p
              className="hero-subtitle"
              style={{
                margin: "0 auto 40px 0",
                maxWidth: "600px",
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              No signup required. No confusion. Guided IRS W-9 wizard with real-time PDF preview. Your data is encrypted and{" "}
              <strong>never stored on our servers.</strong>
            </p>
            <div className="hero-buttons" style={{ marginBottom: '40px' }}>
              <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg" style={{ boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)' }}>
                Start Filling Now — $3.99 →
              </Link>
              <Link href="/fw9.pdf" target="_blank" className="btn btn-outline btn-lg">
                View Sample Form
              </Link>
            </div>
            <div className="hero-trust" style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', gap: '32px' }}>
              <div className="hero-trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                256-bit Encryption
              </div>
              <div className="hero-trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Zero-Data Storage
              </div>
              <div className="hero-trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                5k+ Forms Generated
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

      {/* ===== TRUST BAR ===== */}
      <div style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Trusted by freelancers & contractors at
          </p>
          <div className="trust-bar-logos">
            <span style={{ fontSize: '18px', fontWeight: 800 }}>Upwork</span>
            <span style={{ fontSize: '18px', fontWeight: 800 }}>Toptal</span>
            <span style={{ fontSize: '18px', fontWeight: 800 }}>Fiverr</span>
            <span style={{ fontSize: '18px', fontWeight: 800 }}>Deel</span>
            <span style={{ fontSize: '18px', fontWeight: 800 }}>Remote.com</span>
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section section-light" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-label">How It Works</div>
            <h2 className="section-title">Fill out your W-9 form in three simple steps</h2>
            <p className="section-desc">
              No learning curve. Answer a few questions and get your IRS-ready W-9 PDF instantly.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Scan or Enter Details</h3>
              <p>Upload a photo of your ID or old W-9 and our Gemini AI scanner extracts your data instantly. Or, use our guided wizard to type it in manually.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Live PDF Preview</h3>
              <p>Watch your official W-9 form generate in real-time as you complete each step. See exactly how it looks before you download.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Sign & Download</h3>
              <p>Sign digitally (Type, Draw, or Upload), pay once ($3.99), and get your clean, IRS-ready PDF delivered instantly to your email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY EASYW9FORM vs COMPETITORS ===== */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Why EasyW9Form?</div>
            <h2 className="section-title">The smartest way to fill W-9 forms online</h2>
            <p className="section-desc">
              See how we compare to other options for filling out your W-9 form.
            </p>
          </div>
          
          <div style={{ overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'separate', 
              borderSpacing: 0, 
              fontSize: '14px',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              minWidth: '700px'
            }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>Feature</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 800, borderBottom: '2px solid var(--primary)', background: 'var(--primary-subtle)', color: 'var(--primary)' }}>
                    EasyW9Form ⭐
                  </th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600, borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>IRS PDF (Manual)</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600, borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>TurboTax / H&R Block</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600, borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>Other W9 Fillers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Price', '$3.99 one-time', 'Free', '$20–$89/yr subscription', '$5–$15'],
                  ['AI Smart Scanner', '✅ Gemini Vision OCR', '❌ None', '❌ None', '❌ None'],
                  ['Guided Wizard', '✅ Step-by-step', '❌ DIY', '✅ But overkill', '⚠️ Basic'],
                  ['Real-time PDF Preview', '✅ Live preview', '❌ None', '❌ None', '⚠️ Limited'],
                  ['Digital Signatures', '✅ Type, Draw, Upload', '❌ Manual', '⚠️ Limited', '⚠️ Limited'],
                  ['No Signup Required', '✅ No account', '✅', '❌ Account required', '❌ Account required'],
                  ['Zero Data Storage', '✅ SSN/EIN never stored', '✅ (it\'s paper)', '❌ Stores your data', '❌ Stores your data'],
                  ['IRS Compliance Check', '✅ Built-in validation', '❌ Manual', '✅', '⚠️ Partial'],
                  ['Instant Download', '✅ Seconds', '⚠️ Print only', '⚠️ After signup', '⚠️ After signup'],
                  ['Mobile Friendly', '✅ Works on any device', '❌ Not fillable on phone', '✅', '⚠️ Varies'],
                ].map(([feature, ours, irs, turbo, other], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafbfc' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, borderBottom: '1px solid #f1f5f9' }}>{feature}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: 'var(--primary)', background: i % 2 === 0 ? 'rgba(37,99,235,0.03)' : 'rgba(37,99,235,0.06)' }}>{ours}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: 'var(--text-secondary)' }}>{irs}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: 'var(--text-secondary)' }}>{turbo}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: 'var(--text-secondary)' }}>{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              
              <div style={{ marginBottom: '32px', background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B' }}>★</span>)}
                  <span style={{ fontSize: '14px', fontWeight: 600, marginLeft: '8px' }}>4.9/5 from 2,000+ users</span>
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                  &quot;I was terrified of making a mistake on my EIN for a new client. EasyW9 guided me through the classification questions and I had a perfect PDF in literally 60 seconds.&quot;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>JD</div>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Jason D., Senior Contractor</span>
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
              <div className="pricing-card" style={{ margin: 0, width: '100%', boxShadow: 'var(--shadow-xl)', border: '2px solid var(--primary)' }}>
                <div className="pricing-badge">🔥 Limited-Time Launch Price</div>
                <div className="pricing-amount">$3<span>.99</span></div>
                <p className="pricing-desc">
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginRight: '8px' }}>$4.99</span>
                  Save 20% — offer ends soon!
                </p>
                <div className="pricing-features">
                  <div className="pricing-feature">
                    <span className="pricing-feature-label">Guided W-9 Wizard</span>
                    <span className="pricing-feature-value pricing-feature-free">FREE</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="pricing-feature-label">Real-time PDF Preview</span>
                    <span className="pricing-feature-value pricing-feature-free">FREE</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="pricing-feature-label">IRS Compliance Validation</span>
                    <span className="pricing-feature-value pricing-feature-free">FREE</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="pricing-feature-label">Smart Document Scanner (OCR)</span>
                    <span className="pricing-feature-value pricing-feature-free">FREE</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="pricing-feature-label">Download Final W-9 PDF</span>
                    <span className="pricing-feature-value pricing-feature-paid" style={{ fontSize: '18px' }}>$3.99</span>
                  </div>
                </div>
                <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg" style={{ width: '100%', background: 'var(--primary)', color: 'white' }}>
                  Start Filling My W-9 Now →
                </Link>
                <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Secure payment via Razorpay · No subscriptions
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
              Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, email us at support@easyw9form.com.
            </p>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  background: openFaq === idx ? 'white' : '#fafbfc',
                  boxShadow: openFaq === idx ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text)',
                    textAlign: 'left',
                    lineHeight: 1.4,
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div
                    style={{
                      padding: '0 24px 20px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      animation: 'slideDown 0.3s ease',
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section" style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready to fill your W-9 form?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Join thousands of freelancers who trust EasyW9Form. Takes less than 2 minutes.
          </p>
          <Link href="/fill-w9-form-online" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            Fill My W-9 Now — Only $3.99 →
          </Link>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="seo-section" style={{ background: 'white' }}>
        <div className="container-narrow">
          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>What is a W-9 Form (Request for Taxpayer Identification Number)?</h2>
          <p>
            A W-9 form (Request for Taxpayer Identification Number and Certification) is an official 
            IRS document used in the United States. When you work as a freelancer, independent contractor, 
            or vendor, your clients need your W-9 to report payments they make to you on a 1099 form. The W-9 collects 
            your legal name, business name, federal tax classification, address, and Taxpayer Identification Number 
            (TIN) — either your Social Security Number (SSN) or Employer Identification Number (EIN).
            EasyW9Form makes it fast and easy to fill out your W-9 form online, with a guided wizard 
            that ensures accuracy and IRS compliance.
          </p>

          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>How to Fill Out a W-9 Form Online — Step by Step</h2>
          <p>
            Filling out a W-9 requires entering your name exactly as it appears on your tax return, 
            selecting the correct federal tax classification (Individual/Sole Proprietor for most freelancers, 
            or LLC/Corporation for businesses), providing your current mailing address, and entering 
            your SSN or EIN. Common mistakes include using nicknames instead of legal names, selecting 
            the wrong entity type, or entering an incorrect TIN. Our guided W-9 form filler eliminates these errors 
            by walking you through each field with clear instructions and real-time validation.
          </p>

          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Common W-9 Mistakes to Avoid</h2>
          <p>
            The most frequent error when filling out a W-9 is using a nickname or a DBA name on Line 1 — the IRS requires your 
            legal tax name there. Another common mistake is choosing the wrong entity type (e.g., checking &quot;C Corporation&quot; 
            when you are actually a Single Member LLC). Incorrect TIN formatting (e.g., mixing up SSN and EIN formats) 
            can also cause issues during tax season. Our fillable W-9 form generator prevents these pitfalls by 
            interpreting IRS rules for you in real-time and flagging errors before you download.
          </p>

          <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Download Your W-9 PDF Instantly</h2>
          <p>
            With EasyW9Form, you can generate a completed, IRS-ready W-9 PDF in under two minutes. 
            Your information is processed securely using 256-bit encryption and never stored on our servers. 
            Once you complete the form and make your one-time $3.99 payment, you receive an instant download 
            of your professionally filled W-9 that&apos;s ready to submit to any client, employer, or financial institution.
            No signup required. No subscriptions. Just a fast, secure, fillable W-9 form online.
          </p>
        </div>
      </section>
    </>
  );
}
