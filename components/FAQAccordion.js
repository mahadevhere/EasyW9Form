'use client';

import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {items.map((item, idx) => (
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
  );
}
