import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'How to Fill Out a W-9 Form: Step-by-Step (2026)',
  description: 'Learn exactly how to fill out IRS Form W-9 correctly. Our step-by-step guide covers entity types, TIN, and common mistakes for freelancers and LLCs.',
  alternates: { canonical: 'https://www.easyw9form.com/guides/how-to-fill-w9' },
  openGraph: {
    title: 'How to Fill Out a W-9 Form (2026 Guide)',
    description: 'Step-by-step guide to filling out IRS Form W-9 correctly — entity types, TIN, common mistakes for freelancers and LLCs.',
    url: 'https://www.easyw9form.com/guides/how-to-fill-w9',
    type: 'article',
    siteName: 'EasyW9Form',
  },
};

/* ── Structured Data (server-rendered for crawler visibility) ── */
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Fill Out a W-9 Form: Step-by-Step (2026)',
  description: 'Learn exactly how to fill out IRS Form W-9 correctly. Our step-by-step guide covers entity types, TIN, and common mistakes for freelancers and LLCs.',
  url: 'https://www.easyw9form.com/guides/how-to-fill-w9',
  datePublished: '2026-04-20',
  dateModified: '2026-05-10',
  author: { '@type': 'Organization', name: 'EasyW9Form', url: 'https://www.easyw9form.com' },
  publisher: {
    '@type': 'Organization', name: 'EasyW9Form', url: 'https://www.easyw9form.com',
    logo: { '@type': 'ImageObject', url: 'https://www.easyw9form.com/og-image.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.easyw9form.com/guides/how-to-fill-w9' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.easyw9form.com' },
    { '@type': 'ListItem', position: 2, name: 'How to Fill Out a W-9', item: 'https://www.easyw9form.com/guides/how-to-fill-w9' },
  ],
};

export default function GuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideLayout 
        title="How to Fill Out a W-9 Form"
        subtitle="The complete step-by-step guide to filling out IRS Form W-9 correctly — for freelancers, contractors, and small businesses."
        lastUpdated="April 2026"
        headerImage="/images/guides/header-banner.png"
      >
      {/* Intro */}
      <p>
        If you are an independent contractor, freelancer, or run a small business, you will inevitably be asked to fill out a W-9 form. Companies use this form to collect your tax information so they can report the payments they make to you to the IRS.
      </p>

      <div className="alert">
        <strong>⚠️ Important:</strong> Filing a W-9 incorrectly can lead to &quot;backup withholding,&quot; where the payer is required to withhold 24% of your payment and send it straight to the IRS.
      </div>

      {/* ── STEP 1 ── */}
      <div className="guide-step-card">
        <div className="guide-step-number">1</div>
        <div className="guide-step-body">
          <h2 className="guide-step-title">Enter Your Name (Lines 1 & 2)</h2>
          <p>
            On <strong>Line 1</strong>, enter your full legal name exactly as it appears on your federal tax return. If you are a sole proprietor, this is your personal name — not your business name.
          </p>
          <p>
            <strong>Line 2</strong> is for your business name or &quot;Doing Business As&quot; (DBA) — only if it differs from Line 1. LLCs and corporations should enter their registered entity name here.
          </p>
          <div className="guide-step-visual">
            <img src="/images/guides/line1-line2.png" alt="W-9 Line 1 Sole Proprietor name vs Line 2 LLC Business Name visual guide" />
          </div>
        </div>
      </div>

      {/* ── STEP 2 ── */}
      <div className="guide-step-card">
        <div className="guide-step-number">2</div>
        <div className="guide-step-body">
          <h2 className="guide-step-title">Select Your Federal Tax Classification</h2>
          <p>
            This is where most mistakes happen. Check <strong>one</strong> box that matches your business entity:
          </p>
          <div className="guide-checklist">
            <div className="guide-checklist-item">
              <span className="guide-check-icon">✓</span>
              <div><strong>Individual / Sole Proprietor</strong> — Freelancers working under their own name, or single-member LLCs not electing corporate status.</div>
            </div>
            <div className="guide-checklist-item">
              <span className="guide-check-icon">✓</span>
              <div><strong>C Corporation / S Corporation</strong> — Incorporated businesses.</div>
            </div>
            <div className="guide-checklist-item">
              <span className="guide-check-icon">✓</span>
              <div><strong>Partnership</strong> — Multi-member businesses that aren&apos;t corporations.</div>
            </div>
            <div className="guide-checklist-item">
              <span className="guide-check-icon">✓</span>
              <div><strong>LLC</strong> — You must also specify the tax classification: C, S, or P (Partnership).</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STEP 3 ── */}
      <div className="guide-step-card">
        <div className="guide-step-number">3</div>
        <div className="guide-step-body">
          <h2 className="guide-step-title">Provide Your Mailing Address</h2>
          <p>
            Enter the address where you want your tax documents (such as Form 1099-NEC) to be mailed. Make sure this is a current, deliverable mailing address. A P.O. Box is acceptable.
          </p>
        </div>
      </div>

      {/* ── STEP 4 ── */}
      <div className="guide-step-card">
        <div className="guide-step-number">4</div>
        <div className="guide-step-body">
          <h2 className="guide-step-title">Enter Your Taxpayer Identification Number (TIN)</h2>
          <p>
            You must provide either your <strong>Social Security Number (SSN)</strong> or your <strong>Employer Identification Number (EIN)</strong>.
          </p>
          <div className="guide-tin-rules">
            <div className="guide-tin-rule">
              <div className="guide-tin-label ssn">SSN</div>
              <div>Use your SSN if you are a <strong>sole proprietor</strong> or individual freelancer. The IRS generally prefers the SSN in this case.</div>
            </div>
            <div className="guide-tin-rule">
              <div className="guide-tin-label ein">EIN</div>
              <div>Use your EIN if you are a <strong>corporation, partnership, or LLC</strong>. You must use an EIN if you have employees.</div>
            </div>
          </div>
          <div className="guide-step-visual">
            <img src="/images/guides/ssn-ein.png" alt="W-9 Part I — SSN vs EIN decision guide showing which number to use" />
          </div>
        </div>
      </div>

      {/* ── STEP 5 ── */}
      <div className="guide-step-card">
        <div className="guide-step-number">5</div>
        <div className="guide-step-body">
          <h2 className="guide-step-title">Sign the Certification (Part II)</h2>
          <p>
            By signing the W-9, you are certifying under penalty of perjury that:
          </p>
          <ol className="guide-cert-list">
            <li>The TIN you provided is correct.</li>
            <li>You are not subject to backup withholding.</li>
            <li>You are a U.S. citizen or other U.S. person.</li>
            <li>The FATCA code(s) entered are correct (if applicable).</li>
          </ol>
        </div>
      </div>

      {/* ── COMMON MISTAKES ── */}
      <div className="guide-mistakes-section">
        <h2 className="guide-mistakes-title">
          <span className="guide-mistakes-icon">⚡</span>
          Common W-9 Mistakes to Avoid
        </h2>
        <div className="guide-mistakes-grid">
          <div className="guide-mistake-card">
            <div className="guide-mistake-emoji">⚠️</div>
            <h4>Wrong Tax Classification</h4>
            <p>Checking &quot;Individual&quot; when you have an S-Corp or LLC. Match your entity exactly.</p>
          </div>
          <div className="guide-mistake-card">
            <div className="guide-mistake-emoji">🚫</div>
            <h4>Using a Nickname</h4>
            <p>Writing &quot;Mike&quot; instead of &quot;Michael&quot; — your name must match your tax return.</p>
          </div>
          <div className="guide-mistake-card">
            <div className="guide-mistake-emoji">✍️</div>
            <h4>Missing Signature</h4>
            <p>Failing to sign and date the document makes it completely invalid.</p>
          </div>
          <div className="guide-mistake-card">
            <div className="guide-mistake-emoji">🔢</div>
            <h4>Incorrect TIN</h4>
            <p>Double-check your SSN or EIN. Errors cause payment delays and IRS notices.</p>
          </div>
        </div>
      </div>

    </GuideLayout>
    </>
  );
}
