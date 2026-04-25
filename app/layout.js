import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata = {
  title: 'Fill W-9 Form Online | Secure IRS-Ready PDF — EasyW9Form',
  description: 'Fill out your W-9 form online in minutes. Secure, no-signup IRS W-9 wizard with instant PDF download. Zero data storage policy. Trusted by freelancers.',
  keywords: 'w9, w9 form, fill w9, fill w9 online, fillable w9, w 9 form, w9 tax form, fillable w 9 form, online w9 filler, fill out w9 online, free w9 form, downloadable w9, editable w9, w9 form fillable, w9 form fill out, how to fill out a w9, blank w9 form, irs w 9 form, w9 form free, w9 pdf filler, online w9 form, printable w9, fill out w9 form, w9 for business, w9 for llc, how to fill out w9 form, w9 independent contractor, electronic w9, digital w9, creating a w9, w9 form online fill, w9 form filler',
  openGraph: {
    title: 'Fill W-9 Form Online | Secure IRS PDF | EasyW9Form',
    description: 'Fill and download your W-9 form online in 2 minutes. No signup. Zero data stored. Guided wizard with live PDF preview.',
    url: 'https://www.easyw9form.com',
    type: 'website',
    siteName: 'EasyW9Form',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.easyw9form.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EasyW9Form — Fill Your W-9 Form Online Securely',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@easyw9form',
    creator: '@easyw9form',
    title: 'Fill W-9 Form Online | Secure & Fast',
    description: 'The fastest, most secure way to fill out your W-9 form online. Guided wizard, live preview, instant PDF download. No data stored.',
    images: ['https://www.easyw9form.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.easyw9form.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your code here
    // msvalidate.01 is the Bing verification code
    other: {
      'msvalidate.01': 'B4AF113BE1B98DFC9A6A3204AFC5F0E9', // Placeholder or add your actual Bing code
    },
  },
};

import LayoutWrapper from '@/components/LayoutWrapper';

/* ── Schema.org structured data (server-rendered for crawler visibility) ── */
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EasyW9Form',
  url: 'https://www.easyw9form.com',
  description: 'Fill out your W-9 form online in minutes. Secure, no-signup IRS W-9 wizard with instant PDF download. Zero data storage policy.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '3.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2000',
    bestRating: '5',
    worstRating: '1',
  },
  creator: {
    '@type': 'Organization',
    name: 'EasyW9Form',
    url: 'https://www.easyw9form.com',
    logo: 'https://www.easyw9form.com/favicon.ico',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EasyW9Form',
  url: 'https://www.easyw9form.com',
  logo: 'https://www.easyw9form.com/og-image.png',
  sameAs: [
    'https://twitter.com/easyw9form',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@easyw9form.com',
    contactType: 'customer support',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.easyw9form.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Fill W-9 Online',
      item: 'https://www.easyw9form.com/fill-w9-form-online',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a W-9 form and who needs to fill one out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A W-9 (Request for Taxpayer Identification Number and Certification) is an IRS form used in the United States. Independent contractors, freelancers, sole proprietors, and vendors are typically asked to fill one out by clients or companies that pay them $600 or more per year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data secure? Do you store my SSN or EIN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely not. We maintain a strict Zero-Data-Storage policy. Your SSN or EIN is processed entirely within your browser using 256-bit encryption. It is never transmitted to or stored on our servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to fill out a W-9 form?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most users complete their W-9 in under 2 minutes using our guided wizard. Our step-by-step interface walks you through each field with clear instructions, IRS hints, and real-time validation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit my W-9 after downloading?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The downloaded PDF is a finalized, IRS-ready document. If you need to make changes, simply fill out a new form — your progress is saved locally in your browser, so most fields will be pre-filled.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment partner Razorpay. All transactions are protected by SSL encryption and PCI-DSS compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this the official IRS W-9 form?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our tool generates the exact same Form W-9 (Rev. October 2018) that the IRS publishes on irs.gov. The only difference is that we auto-fill it based on your inputs, so you avoid common mistakes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer refunds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Due to the instant, digital nature of our service, we do not offer refunds once the document has been downloaded. If you experience a technical issue, contact support@easyw9form.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I fill out a W-9 on my phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! EasyW9Form is fully responsive and works on smartphones, tablets, and desktops. Our mobile-friendly wizard makes it easy to fill your W-9 from anywhere — no app download required.',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Schema.org structured data — rendered server-side for crawler visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
