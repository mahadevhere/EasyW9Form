import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'How to Fill Out a W-9 Form (2026 Guide) | EasyW9Form',
  description: 'Learn exactly how to fill out IRS Form W-9 correctly. Our step-by-step guide covers entity types, TIN, and common mistakes for freelancers and LLCs.',
  alternates: { canonical: '/guides/how-to-fill-w9' },
};

export default function GuidePage() {
  return (
    <GuideLayout 
      title="How to Fill Out a W-9 Form: A Step-by-Step Guide"
      subtitle="The Request for Taxpayer Identification Number and Certification (Form W-9) is the most common form for contractors. Here is how to get it right."
      lastUpdated="April 2026"
    >
      <p>
        If you are an independent contractor, freelancer, or run a small business, you will inevitably be asked to fill out a W-9 form. Companies use this form to collect your tax information so they can report the payments they make to you to the IRS.
      </p>

      <div className="alert">
        <strong>Pro Tip:</strong> Filing a W-9 incorrectly can lead to &quot;backup withholding,&quot; where the payer is required to take 24% of your payment and send it straight to the IRS.
      </div>

      <h2>Step 1: Enter Your Name</h2>
      <p>
        On <strong>Line 1</strong>, enter your legal name as it appears on your tax return. If you are an individual freelancer, this is your personal name.
      </p>
      <p>
        If you have a business name that is different from your legal name (a &quot;Doing Business As&quot; or DBA name), enter it on <strong>Line 2</strong>. Do not put your DBA on Line 1.
      </p>

      <h2>Step 2: Federal Tax Classification</h2>
      <p>
        This is where most mistakes happen. You must check the box that matches your business entity:
      </p>
      <ul>
        <li><strong>Individual/Sole Proprietor:</strong> Choose this if you are a freelancer working under your own name or a single-member LLC that has not elected to be treated as a corporation.</li>
        <li><strong>C Corporation or S Corporation:</strong> Choose this if your business is incorporated.</li>
        <li><strong>Partnership:</strong> Choose this if you have a multi-member business that isn&apos;t a corporation.</li>
        <li><strong>Limited Liability Company (LLC):</strong> If you check this, you must also provide the tax classification (C, S, or P).</li>
      </ul>

      <h2>Step 3: Provide Your Address</h2>
      <p>
        Enter the address where you want your tax documents (like Form 1099-NEC) to be mailed. Ensure this is an up-to-date mailing address.
      </p>

      <h2>Step 4: Taxpayer Identification Number (TIN)</h2>
      <p>
        You must provide either your <strong>Social Security Number (SSN)</strong> or your <strong>Employer Identification Number (EIN)</strong>. 
      </p>
      <p>
        If you are a sole proprietor, the IRS generally prefers you use your SSN, but you can also use an EIN if you have one. If you are a corporation or partnership, you must use an EIN.
      </p>

      <h2>Step 5: Certification and Signature</h2>
      <p>
        By signing the W-9, you are certifying under penalty of perjury that:
      </p>
      <ol>
        <li>The TIN you provided is correct.</li>
        <li>You are not subject to backup withholding.</li>
        <li>You are a U.S. citizen or other U.S. person.</li>
      </ol>

      <h3>Common Pitfalls to Avoid</h3>
      <ul>
        <li><strong>Wrong Entity Type:</strong> Checking &quot;Individual&quot; when you have an S-Corp.</li>
        <li><strong>Nickname usage:</strong> Using &quot;Mike&quot; instead of &quot;Michael&quot; if that&apos;s what your tax return says.</li>
        <li><strong>Missing Signatures:</strong> Failing to sign and date the document makes it invalid.</li>
      </ul>
    </GuideLayout>
  );
}
