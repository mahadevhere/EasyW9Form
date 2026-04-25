import Link from 'next/link';

export default function GuideLayout({ children, title, subtitle, lastUpdated }) {
  return (
    <div className="section" style={{ background: 'var(--bg-soft)', minHeight: '100vh' }}>
      <div className="container-narrow">
        <Link href="/" className="btn btn-sm btn-outline" style={{ marginBottom: '32px' }}>
          ← Back to Home
        </Link>
        
        <article className="guide-article" style={{ 
          background: 'white', 
          borderRadius: 'var(--radius-xl)', 
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)'
        }}>
          <header style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
            <div style={{ 
              color: 'var(--primary)', 
              fontWeight: 700, 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              marginBottom: '12px'
            }}>
              W-9 Guide & Resources
            </div>
            <h1 style={{ 
              fontSize: 'clamp(28px, 4vw, 40px)', 
              fontWeight: 800, 
              lineHeight: 1.2, 
              marginBottom: '16px',
              color: 'var(--text)'
            }}>
              {title}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {subtitle}
            </p>
            {lastUpdated && (
              <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                Last Updated: {lastUpdated}
              </div>
            )}
          </header>

          <div className="guide-content" style={{ 
            fontSize: '16px', 
            lineHeight: 1.8, 
            color: 'var(--text-secondary)'
          }}>
            {children}
          </div>

          <footer style={{ 
            marginTop: '64px', 
            paddingTop: '32px', 
            borderTop: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text)' }}>Ready to fill your W-9 accurately?</h3>
            <p style={{ marginBottom: '24px' }}>Our guided wizard makes it fast, easy, and secure.</p>
            <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg">
              Start Filling Now — $3.99
            </Link>
          </footer>
        </article>
      </div>
      
      <style jsx global>{`
        .guide-article {
          padding: 48px;
        }
        @media (max-width: 768px) {
          .guide-article {
            padding: 24px;
          }
        }
        .guide-content h2 {
          color: var(--text);
          font-size: 24px;
          font-weight: 700;
          margin: 40px 0 16px;
        }
        .guide-content h3 {
          color: var(--text);
          font-size: 20px;
          font-weight: 600;
          margin: 32px 0 12px;
        }
        .guide-content p {
          margin-bottom: 20px;
        }
        .guide-content ul, .guide-content ol {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        .guide-content li {
          margin-bottom: 10px;
        }
        .guide-content strong {
          color: var(--text);
        }
        .guide-content .alert {
          background: var(--primary-light);
          padding: 20px;
          border-radius: var(--radius-md);
          border-left: 4px solid var(--primary);
          margin: 32px 0;
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
