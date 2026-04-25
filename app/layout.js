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
    type: 'website',
    siteName: 'EasyW9Form',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fill W-9 Form Online | Secure & Fast',
    description: 'The fastest, most secure way to fill out your W-9 form online. Guided wizard, live preview, instant PDF download. No data stored.',
  },
  alternates: {
    canonical: 'https://easyw9form.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import LayoutWrapper from '@/components/LayoutWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
