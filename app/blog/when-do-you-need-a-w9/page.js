import GuideLayout from '@/components/GuideLayout';
import Link from 'next/link';

export const metadata = {
  title: 'When Do You Need a W-9 Form? (Complete 2026 Guide) | EasyW9Form',
  description:
    'Find out exactly when you need to fill out or request a W-9 form. Covers freelancers, landlords, banks, real estate, and the $600 threshold rule.',
  alternates: {
    canonical: 'https://www.easyw9form.com/blog/when-do-you-need-a-w9',
  },
};

export default function BlogPage() {
  return (
    <GuideLayout
      title="When Do You Need a W-9 Form?"
      subtitle="A complete breakdown of every situation where IRS Form W-9 is required — whether you're the one filling it or requesting it."
      lastUpdated="April 2026"
    >
      <p>
        IRS Form W-9 is one of the most commonly used tax documents in the United States. But many people are confused about <strong>when</strong> they actually need one. Here&apos;s a definitive guide to every situation where a W-9 is required.
      </p>

      <h2>The $600 Rule</h2>
      <p>
        The IRS requires businesses to file <strong>Form 1099-NEC</strong> for any non-employee to whom they paid <strong>$600 or more</strong> during the tax year. To file that 1099, the business needs the payee&apos;s taxpayer information — which comes from the W-9.
      </p>
      <div className="alert">
        <strong>Important:</strong> The $600 threshold is cumulative for the entire calendar year with a single payer, not per payment.
      </div>

      <h2>Situations Where You Fill Out a W-9</h2>
      <ul>
        <li><strong>Freelancing or contract work:</strong> Any time a client hires you as an independent contractor, they&apos;ll request a W-9 before your first payment.</li>
        <li><strong>Opening a bank account:</strong> Banks request W-9s to report interest income they pay you (reported on Form 1099-INT).</li>
        <li><strong>Real estate transactions:</strong> If you sell property, the closing agent may request a W-9 to report the transaction to the IRS.</li>
        <li><strong>Investment accounts:</strong> Brokerages require a W-9 to report dividends and capital gains.</li>
        <li><strong>Cancellation of debt:</strong> If a creditor cancels more than $600 of your debt, they need your W-9 to file Form 1099-C.</li>
      </ul>

      <h2>Situations Where You Request a W-9</h2>
      <p>
        If you&apos;re a business owner, you need to collect W-9s from:
      </p>
      <ul>
        <li><strong>Freelancers and contractors</strong> you pay $600+ annually.</li>
        <li><strong>Landlords</strong> if you pay $600+ in rent for business space.</li>
        <li><strong>Attorneys</strong> for legal services, regardless of the amount.</li>
        <li><strong>Service providers</strong> such as accountants, consultants, and designers.</li>
      </ul>

      <h2>When a W-9 is NOT Needed</h2>
      <ul>
        <li><strong>Employees:</strong> W-2 workers fill out a W-4, not a W-9.</li>
        <li><strong>Purchases of merchandise:</strong> Buying products doesn&apos;t require a W-9.</li>
        <li><strong>Payments under $600:</strong> Though many companies still request one for their records.</li>
        <li><strong>Corporations:</strong> Generally, payments to C-Corps and S-Corps are exempt from 1099 reporting (with exceptions for medical/legal payments).</li>
      </ul>

      <h2>How Long is a W-9 Valid?</h2>
      <p>
        A W-9 does not expire. However, if any of the information on the form changes (such as your name, address, or TIN), you must submit a new W-9 to the requesting party. Many companies request updated W-9s annually as a best practice.
      </p>

      <h2>What Happens if You Don&apos;t Provide a W-9?</h2>
      <p>
        If you refuse to provide a W-9, the payer is required by the IRS to withhold <strong>24% of your payment</strong> as &quot;backup withholding&quot; and send it directly to the IRS. You would then need to claim this amount when filing your tax return.
      </p>

      <p>
        Ready to complete your W-9? Use our <Link href="/fill-w9-form-online" style={{ color: 'var(--primary)', fontWeight: 700 }}>secure online W-9 generator</Link> to fill out and download your form in minutes — no signup required.
      </p>
    </GuideLayout>
  );
}
