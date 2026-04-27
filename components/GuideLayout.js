'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GuideLayout({ children, title, subtitle, lastUpdated }) {
  const pathname = usePathname();
  
  const guides = [
    { href: '/guides/how-to-fill-w9', label: 'Step-by-Step Guide' },
    { href: '/guides/tax-difference-w9-vs-w4', label: 'W-9 vs. W-4' },
    { href: '/guides/w9-for-independent-contractors', label: 'Freelancer Guide' },
    { href: '/guides/secure-w9-generation', label: 'Security & Privacy' },
    { href: '/blog/w9-form-for-llc', label: 'W-9 for LLCs' },
    { href: '/blog/when-do-you-need-a-w9', label: 'When Do You Need a W-9?' },
    { href: '/blog/w9-form-for-rental-property', label: 'W-9 for Rental Property' },
  ];

  return (
    <div className="section" style={{ background: 'var(--bg-soft)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <aside className="hide-mobile" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>
                All W-9 Resources
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {guides.map((guide) => (
                  <Link 
                    key={guide.href} 
                    href={guide.href}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      background: pathname === guide.href ? 'var(--primary-subtle)' : 'transparent',
                      color: pathname === guide.href ? 'var(--primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {guide.label}
                  </Link>
                ))}
              </nav>
              
              <div style={{ marginTop: '32px', background: 'var(--bg-soft)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Need your W-9 now?</p>
                <Link href="/fill-w9-form-online" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  Start Filling
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <article className="guide-article" style={{ 
            background: 'white', 
            borderRadius: '24px', 
            padding: '48px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)'
          }}>
            <header style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
              <div style={{ 
                color: 'var(--primary)', 
                fontWeight: 800, 
                fontSize: '13px', 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                marginBottom: '16px'
              }}>
                Official Guide
              </div>
              <h1 style={{ 
                fontSize: 'clamp(32px, 4vw, 44px)', 
                fontWeight: 900, 
                lineHeight: 1.1, 
                marginBottom: '20px',
                color: 'var(--text)',
                letterSpacing: '-0.02em'
              }}>
                {title}
              </h1>
              <p style={{ fontSize: '19px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                {subtitle}
              </p>
              {lastUpdated && (
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }} />
                  Last Reviewed: {lastUpdated}
                </div>
              )}
            </header>

            <div className="guide-content" style={{ 
              fontSize: '17px', 
              lineHeight: 1.8, 
              color: 'var(--text-secondary)'
            }}>
              {children}
            </div>

            <footer style={{ 
              marginTop: '64px', 
              padding: '40px', 
              background: 'var(--bg-soft)',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', color: 'var(--text)' }}>Ready to generate your W-9?</h3>
              <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>Our guided wizard ensures 100% accuracy and IRS compliance. Zero data storage.</p>
              <Link href="/fill-w9-form-online" className="btn btn-primary btn-lg">
                Start Filling Now — $3.99
              </Link>
            </footer>
          </article>
        </div>
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
          font-size: 26px;
          font-weight: 800;
          margin: 48px 0 20px;
          letter-spacing: -0.01em;
        }
        .guide-content h3 {
          color: var(--text);
          font-size: 20px;
          font-weight: 700;
          margin: 32px 0 16px;
        }
        .guide-content p {
          margin-bottom: 24px;
        }
        .guide-content ul, .guide-content ol {
          margin-bottom: 32px;
          padding-left: 24px;
        }
        .guide-content li {
          margin-bottom: 12px;
        }
        .guide-content strong {
          color: var(--text);
          font-weight: 700;
        }
        .guide-content .alert {
          background: var(--primary-subtle);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--primary-light);
          margin: 40px 0;
          color: var(--text);
          position: relative;
        }
        .guide-content .alert strong {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
