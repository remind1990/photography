import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { PhotoProvider } from './context/PhotoContext';
import { getCachedPhotos } from '@/lib/getCachedPhotos';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dubenko Photography - St. Johns, Newfoundland and Labrador',
  description:
    'Professional photography services in St. Johns, Newfoundland and Labrador. Book your photoshoot today!',
  keywords: [
    'Photography',
    'St. Johns',
    'Newfoundland and Labrador',
    'Photoshoot',
    'Dubenko Photography',
    'Canada',
  ],
  openGraph: {
    title: 'Dubenko Photography - St. Johns, Newfoundland and Labrador',
    description:
      'Professional photography services in St. Johns, Newfoundland and Labrador. Book your photoshoot today!',
    url: 'https://dubenko-olya-ph.com/',
    images: [
      {
        url: 'https://dubenko-olya-ph.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dubenko Photography',
      },
    ],
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavBar />
          <PhotoProvider initialPhotos={photos ?? []}>{children}</PhotoProvider>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Dubenko Photography',
                image: 'https://dubenko-olya-ph.com/og-image.jpg',
                url: 'https://dubenko-olya-ph.com',
                telephone: '+1 709-555-1234',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: "St. John's",
                  addressRegion: 'NL',
                  postalCode: 'A1B 0G5',
                  addressCountry: 'CA',
                },
                description:
                  "Professional photographer in St. John's, Newfoundland and Labrador.",
              }),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
