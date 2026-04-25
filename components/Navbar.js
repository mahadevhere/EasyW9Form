'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span>EasyW9Form</span>
        </Link>
        <div className="nav-links">
          <div className="hide-mobile" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/#how-it-works" className="nav-link">How it Works</Link>
            <Link href="/guides/how-to-fill-w9" className="nav-link">Guides</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
          </div>
          <Link href="/fill-w9-form-online" className="btn btn-primary btn-sm">
            Start Filling →
          </Link>
          <button 
            className="mobile-menu-btn hide-desktop"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="hide-desktop" style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'absolute', width: '100%', zIndex: 99, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <Link href="/#how-it-works" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block' }}>How it Works</Link>
          <Link href="/guides/how-to-fill-w9" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block' }}>Guides</Link>
          <Link href="/#pricing" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block' }}>Pricing</Link>
          <Link href="/#faq" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block' }}>FAQ</Link>
        </div>
      )}
    </nav>
  );
}
