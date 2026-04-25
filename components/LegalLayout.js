'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LegalLayout({ children, title, lastUpdated }) {
  const pathname = usePathname();

  const links = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund', label: 'Refund Policy' },
  ];

  return (
    <div className="section" style={{ background: 'var(--bg-soft)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '48px', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <aside className="hide-mobile" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '20px', 
              padding: '24px', 
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                Legal Center
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      background: pathname === link.href ? 'var(--primary-subtle)' : 'transparent',
                      color: pathname === link.href ? 'var(--primary)' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: pathname === link.href ? 'var(--primary-light)' : 'transparent'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Questions about our terms? Reach out at <br />
                  <a href="mailto:support@easyw9form.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>support@easyw9form.com</a>
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article style={{ 
            background: 'white', 
            borderRadius: '24px', 
            padding: '48px', 
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <header style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
               <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'var(--text)', marginBottom: '16px', letterSpacing: '-0.02em' }}>{title}</h1>
               {lastUpdated && (
                 <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
                   Last Updated: {lastUpdated}
                 </p>
               )}
            </header>

            <div className="legal-content">
              {children}
            </div>

            <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
               <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                 Need to fill out a secure, IRS-compliant W-9 form?
               </p>
               <Link href="/fill-w9-form-online" className="btn btn-primary">
                 Start Filling Now — $3.99
               </Link>
            </div>
          </article>
        </div>
      </div>

      <style jsx global>{`
        .legal-content h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin-top: 48px;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }
        .legal-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .legal-content p {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .legal-content ul, .legal-content ol {
          margin-bottom: 24px;
          padding-left: 24px;
        }
        .legal-content li {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        .legal-content strong {
          color: var(--text);
          font-weight: 700;
        }
        @media (max-width: 768px) {
          article {
            padding: 24px !important;
          }
          h1 {
            fontSize: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
