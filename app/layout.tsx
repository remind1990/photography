import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { PhotoProvider } from './context/PhotoContext';
import { getCachedPhotos } from '@/lib/getCachedPhotos';
import Analytics from '@/components/Analytics';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dubenko-olya-ph.com'),
  title: {
    default: "Dubenko Photography — Photographer in St. John's, Newfoundland",
    template: '%s | Dubenko Photography',
  },
  description:
    "Professional photographer in St. John's, Newfoundland and Labrador. Individual and family photoshoots. Book your session today!",
  keywords: [
    'photographer',
    "St. John's photographer",
    'Newfoundland and Labrador',
    'Newfoundland photographer',
    'photoshoot',
    'family photoshoot',
    'individual portrait',
    'love story photoshoot',
    'Dubenko Photography',
    'Olha Dubenko',
    'Canada photographer',
  ],
  alternates: {
    canonical: '/',
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify Search Console.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    siteName: 'Dubenko Photography',
    title: "Dubenko Photography — Photographer in St. John's, Newfoundland",
    description:
      "Professional photographer in St. John's, Newfoundland and Labrador. Individual and family photoshoots.",
    url: 'https://dubenko-olya-ph.com/',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dubenko Photography — Photographer in St. John's, Newfoundland",
    description:
      "Professional photographer in St. John's, Newfoundland and Labrador. Book your photoshoot today!",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const photos = await getCachedPhotos();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Analytics />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavBar />
          <PhotoProvider initialPhotos={photos ?? []}>{children}</PhotoProvider>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                '@id': 'https://dubenko-olya-ph.com/#business',
                name: 'Dubenko Photography',
                image: 'https://dubenko-olya-ph.com/photo1.jpg',
                logo: 'https://dubenko-olya-ph.com/logo.png',
                url: 'https://dubenko-olya-ph.com',
                email: 'dubenko.o.m@gmail.com',
                priceRange: '$$',
                areaServed: {
                  '@type': 'City',
                  name: "St. John's",
                },
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: "St. John's",
                  addressRegion: 'NL',
                  addressCountry: 'CA',
                },
                founder: {
                  '@type': 'Person',
                  name: 'Olha Dubenko',
                },
                sameAs: [
                  'https://www.instagram.com/olya_photographer_/',
                  'https://www.facebook.com/olha.dubenko.2025',
                ],
                description:
                  "Professional photographer in St. John's, Newfoundland and Labrador, offering individual and family photoshoots.",
              }),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
