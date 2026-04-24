'use client';
import Link from 'next/link';

export default function Navbar() {
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
          <Link href="/#how-it-works" className="nav-link">How it Works</Link>
          <Link href="/#pricing" className="nav-link">Pricing</Link>
          <Link href="/#faq" className="nav-link">FAQ</Link>
          <Link href="/fill-w9-form-online" className="btn btn-primary btn-sm">
            Start Filling →
          </Link>
        </div>
      </div>
    </nav>
  );
}
