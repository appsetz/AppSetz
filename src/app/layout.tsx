import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.appsetz.pro';
const logoPath = '/assets/WhatsApp Image 2025-11-10 at 01.54.27_b1b811b6.jpg';

export const metadata: Metadata = {
  title: {
    default: 'Appsetz — Web & App Development Agency | Startup Digital Solutions India',
    template: '%s | Appsetz — Digital Product Agency',
  },
  description: 'Appsetz is a full-stack digital product agency helping startups and businesses build modern, scalable websites, mobile apps, and SaaS products. Expert web development, UI/UX design, and branding solutions in India.',
  keywords: [
    'web development',
    'app development',
    'startup solutions',
    'digital agency',
    'India tech agency',
    'branding',
    'UI/UX design',
    'SaaS development',
    'business growth',
    'Next.js development',
    'React development',
    'Flutter app development',
    'mobile app development',
    'MVP development',
    'startup tech partner',
    'digital transformation',
    'product design',
    'tech agency India',
    'software development company',
    'cross-platform apps'
  ],
  authors: [{ name: 'Appsetz Team', url: siteUrl }],
  creator: 'Appsetz',
  publisher: 'Appsetz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Appsetz',
    title: 'Appsetz — Transforming Ideas into Powerful Digital Products',
    description: 'Full-stack digital product agency helping startups build modern, scalable websites, mobile apps, and SaaS products. We design and develop custom solutions tailored to your business goals.',
    images: [
      {
        url: logoPath,
        width: 1200,
        height: 630,
        alt: 'Appsetz — Digital Product Agency Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appsetz — Web & App Development Agency',
    description: 'Transforming startup ideas into powerful digital products. Expert web development, mobile apps, UI/UX design, and SaaS solutions.',
    images: [logoPath],
    creator: '@appsetz',
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
  icons: {
    icon: [
      { url: logoPath, sizes: '32x32', type: 'image/jpeg' },
      { url: logoPath, sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: logoPath,
    apple: [
      { url: logoPath, sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Appsetz',
              url: siteUrl,
              logo: `${siteUrl}${logoPath}`,
              description: 'Full-stack digital product agency helping startups and businesses build modern, scalable websites, mobile apps, and SaaS products.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://www.linkedin.com/company/appsetz',
                'https://twitter.com/appsetz',
                'https://www.instagram.com/appsetz',
                'https://github.com/appsetz',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['English', 'Hindi'],
              },
              areaServed: {
                '@type': 'Country',
                name: 'India',
              },
              serviceType: [
                'Web Development',
                'Mobile App Development',
                'UI/UX Design',
                'SaaS Development',
                'Branding',
                'Digital Strategy',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Appsetz',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
