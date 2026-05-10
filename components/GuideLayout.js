'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GuideLayout({ children, title, subtitle, lastUpdated, headerImage, faqs }) {
  const pathname = usePathname();
  
  const guides = [
    { href: '/guides/how-to-fill-w9', label: 'Step-by-Step Guide' },
    { href: '/guides/tax-difference-w9-vs-w4', label: 'W-9 vs. W-4' },
    { href: '/guides/w9-for-independent-contractors', label: 'Freelancer Guide' },
    { href: '/guides/secure-w9-generation', label: 'Security & Privacy' },
    { href: '/guides/what-to-do-without-ein', label: 'No EIN? Use SSN' },
    { href: '/blog/w9-form-for-llc', label: 'W-9 for LLCs' },
    { href: '/blog/when-do-you-need-a-w9', label: 'When Do You Need a W-9?' },
    { href: '/blog/w9-form-for-rental-property', label: 'W-9 for Rental Property' },
    { href: '/blog/w9-vs-1099', label: 'W-9 vs 1099 Explained' },
    { href: '/blog/what-happens-no-w9', label: 'No W-9? Consequences' },
  ];

  /* ── FAQ Schema (JSON-LD) for Google Rich Results ── */
  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="section guide-layout-wrapper" style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* FAQ Schema for Google Rich Results */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="container">
        <div className="guide-layout-grid">
          
          {/* Sidebar */}
          <aside className="hide-mobile" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', paddingLeft: '12px' }}>
                All W-9 Resources
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {guides.map((guide) => (
                  <Link 
                    key={guide.href} 
                    href={guide.href}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      background: pathname === guide.href ? '#EEF2FF' : 'transparent',
                      color: pathname === guide.href ? '#4F46E5' : '#64748B',
                    }}
                  >
                    {guide.label}
                  </Link>
                ))}
              </nav>
              
              <div style={{ marginTop: '24px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '10px', color: '#475569' }}>Need your W-9 now?</p>
                <Link href="/fill-w9-form-online" className="btn btn-primary btn-sm" style={{ width: '100%', fontSize: '13px', padding: '8px 16px' }}>
                  Start Filling →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <article className="guide-article">
            {/* Header Banner */}
            {headerImage && (
              <div className="guide-header-banner">
                <img src={headerImage} alt={title} />
              </div>
            )}

            {/* Article Header */}
            <header className="guide-header">
              <div className="guide-badge">Step-by-Step Guide</div>
              <h1 className="guide-title">{title}</h1>
              <p className="guide-subtitle">{subtitle}</p>
              {lastUpdated && (
                <div className="guide-meta">
                  <span className="guide-meta-dot" />
                  Last reviewed: {lastUpdated}
                </div>
              )}
            </header>

            {/* Content */}
            <div className="guide-content">
              {children}
            </div>

            {/* CTA Footer */}
            <footer className="guide-cta-footer">
              <h3>Ready to generate your W-9?</h3>
              <p>Our guided wizard ensures 100% accuracy and IRS compliance. Zero data storage.</p>
              <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg">
                Start Filling Now — $3.99
              </Link>
            </footer>
          </article>
        </div>
      </div>
      
      <style jsx global>{`
        /* ── Article Shell ── */
        .guide-article {
          background: white;
          border-radius: 20px;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid #E2E8F0;
          overflow: hidden;
        }

        /* ── Layout Grid ── */
        .guide-layout-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 991px) {
          .guide-layout-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
        @media (max-width: 768px) {
          .guide-layout-wrapper {
            padding-top: 72px !important;
            padding-bottom: 40px !important;
          }
        }

        /* ── Header Banner ── */
        .guide-header-banner {
          width: 100%;
          border-bottom: 1px solid #E2E8F0;
        }
        .guide-header-banner img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Article Header ── */
        .guide-header {
          padding: 40px 48px 32px;
          border-bottom: 1px solid #F1F5F9;
        }
        .guide-badge {
          display: inline-block;
          background: #EEF2FF;
          color: #4F46E5;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
        }
        .guide-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 800;
          line-height: 1.2;
          color: #1A2B3C;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .guide-subtitle {
          font-size: 15px;
          color: #64748B;
          line-height: 1.6;
          max-width: 640px;
          margin: 0;
        }
        .guide-meta {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #94A3B8;
        }
        .guide-meta-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
        }

        /* ── Content Area ── */
        .guide-content {
          padding: 40px 48px;
        }
        .guide-content > p,
        .guide-content > div > p {
          font-size: 15px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 20px;
        }
        .guide-content h2 {
          font-size: 22px;
          font-weight: 800;
          color: #1A2B3C;
          margin: 40px 0 12px;
          padding-top: 28px;
          border-top: 1px solid #F1F5F9;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .guide-content h2:first-child,
        .guide-content .guide-step-card h2,
        .guide-step-title {
          border-top: none;
          padding-top: 0;
          margin-top: 0;
        }
        .guide-content h3 {
          font-size: 17px;
          font-weight: 700;
          color: #1E293B;
          margin: 28px 0 10px;
          line-height: 1.3;
        }
        .guide-content p {
          font-size: 15px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 16px;
        }
        .guide-content strong {
          color: #1E293B;
          font-weight: 700;
        }
        .guide-content em {
          color: #475569;
          font-style: italic;
        }
        .guide-content ul,
        .guide-content ol {
          padding-left: 20px;
          margin-bottom: 24px;
          color: #475569;
        }
        .guide-content li {
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 10px;
          padding-left: 4px;
        }
        .guide-content li strong {
          color: #1E293B;
        }
        .guide-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0 32px;
          font-size: 14px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
        }
        .guide-content thead {
          background: #F8FAFC;
        }
        .guide-content th {
          text-align: left;
          padding: 12px 16px;
          font-weight: 700;
          color: #1A2B3C;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #E2E8F0;
        }
        .guide-content td {
          padding: 12px 16px;
          color: #475569;
          border-bottom: 1px solid #F1F5F9;
        }
        .guide-content tbody tr:last-child td {
          border-bottom: none;
        }
        .guide-content tbody tr:hover {
          background: #FAFBFC;
        }
        .guide-content a {
          color: #4F46E5;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .guide-content a:hover {
          border-bottom-color: #4F46E5;
        }
        .guide-content .alert {
          background: #FFFBEB;
          padding: 16px 20px;
          border-radius: 10px;
          border: 1px solid #FDE68A;
          margin: 24px 0 32px;
          font-size: 14px;
          line-height: 1.6;
          color: #92400E;
        }
        .guide-content .alert strong {
          color: #92400E;
        }

        /* ── Step Cards ── */
        .guide-step-card {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
          padding: 28px;
          background: #FAFBFC;
          border-radius: 14px;
          border: 1px solid #E8ECF1;
          transition: box-shadow 0.2s;
        }
        .guide-step-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .guide-step-number {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
        }
        .guide-step-body {
          flex: 1;
          min-width: 0;
        }
        .guide-step-title {
          font-size: 18px;
          font-weight: 700;
          color: #1A2B3C;
          margin: 0 0 12px;
          line-height: 1.3;
        }
        .guide-step-body p {
          font-size: 14px !important;
          line-height: 1.7 !important;
          color: #475569 !important;
          margin-bottom: 12px !important;
        }
        .guide-step-body p:last-of-type {
          margin-bottom: 0 !important;
        }

        /* ── Step Visual (Image) ── */
        .guide-step-visual {
          margin-top: 20px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .guide-step-visual img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Checklist ── */
        .guide-checklist {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
        }
        .guide-checklist-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
        }
        .guide-check-icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          background: #DCFCE7;
          color: #16A34A;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          margin-top: 2px;
        }

        /* ── TIN Rules ── */
        .guide-tin-rules {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 16px 0;
        }
        .guide-tin-rule {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 14px 16px;
          background: white;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
        }
        .guide-tin-label {
          flex-shrink: 0;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .guide-tin-label.ssn {
          background: #FEF3C7;
          color: #92400E;
        }
        .guide-tin-label.ein {
          background: #DBEAFE;
          color: #1E40AF;
        }

        /* ── Certification List ── */
        .guide-cert-list {
          padding-left: 20px !important;
          margin: 8px 0 0 !important;
        }
        .guide-cert-list li {
          font-size: 14px !important;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 6px;
        }

        /* ── Common Mistakes ── */
        .guide-mistakes-section {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #E8ECF1;
        }
        .guide-mistakes-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: #1A2B3C;
          margin-bottom: 20px;
        }
        .guide-mistakes-icon {
          font-size: 20px;
        }
        .guide-mistakes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .guide-mistake-card {
          padding: 20px;
          background: #FAFBFC;
          border-radius: 12px;
          border: 1px solid #E8ECF1;
        }
        .guide-mistake-emoji {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .guide-mistake-card h4 {
          font-size: 14px;
          font-weight: 700;
          color: #1A2B3C;
          margin-bottom: 6px;
        }
        .guide-mistake-card p {
          font-size: 13px !important;
          line-height: 1.5 !important;
          color: #64748B !important;
          margin: 0 !important;
        }

        /* ── CTA Footer ── */
        .guide-cta-footer {
          margin: 0 48px 48px;
          padding: 36px;
          background: linear-gradient(135deg, #EEF2FF, #E0E7FF);
          border-radius: 16px;
          text-align: center;
          border: 1px solid #C7D2FE;
        }
        .guide-cta-footer h3 {
          font-size: 20px;
          font-weight: 800;
          color: #1A2B3C;
          margin-bottom: 8px;
        }
        .guide-cta-footer p {
          font-size: 14px !important;
          color: #64748B !important;
          margin-bottom: 20px !important;
        }

        /* ── Responsive — Tablet ── */
        @media (max-width: 991px) {
          .guide-article {
            border-radius: 16px;
          }
        }

        /* ── Responsive — Phone ── */
        @media (max-width: 768px) {
          .guide-header { padding: 20px 16px 16px; }
          .guide-badge { font-size: 10px; padding: 4px 10px; margin-bottom: 12px; }
          .guide-title { font-size: 22px; }
          .guide-subtitle { font-size: 13px; }
          .guide-content { padding: 20px 16px; }
          .guide-content h2 {
            font-size: 18px;
            margin: 28px 0 8px;
            padding-top: 20px;
          }
          .guide-content h3 { font-size: 15px; margin: 20px 0 6px; }
          .guide-content p { font-size: 14px; margin-bottom: 12px; }
          .guide-content li { font-size: 14px; margin-bottom: 8px; }
          .guide-content th { font-size: 11px; padding: 8px 10px; }
          .guide-content td { font-size: 13px; padding: 8px 10px; }
          .guide-content .alert { padding: 12px 14px; font-size: 13px; margin: 16px 0 24px; }
          .guide-cta-footer { margin: 0 16px 16px; padding: 20px; }
          .guide-cta-footer h3 { font-size: 17px; }
          .guide-cta-footer p { font-size: 13px !important; }
          .guide-step-card { flex-direction: column; gap: 12px; padding: 16px; margin-bottom: 16px; }
          .guide-step-number { width: 32px; height: 32px; font-size: 14px; border-radius: 10px; }
          .guide-step-title { font-size: 16px; }
          .guide-step-body p { font-size: 13px !important; }
          .guide-mistakes-section { margin-top: 28px; padding-top: 20px; }
          .guide-mistakes-title { font-size: 16px; }
          .guide-mistakes-grid { grid-template-columns: 1fr; gap: 8px; }
          .guide-mistake-card { padding: 14px; }
          .guide-mistake-emoji { font-size: 20px; margin-bottom: 4px; }
          .guide-mistake-card h4 { font-size: 13px; }
          .guide-mistake-card p { font-size: 12px !important; }
          .guide-tin-rule { padding: 10px 12px; font-size: 13px; }
          .guide-checklist-item { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
