import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { PhotoProvider } from './context/PhotoContext';
import { fetchPhotos } from '@/lib/fetchPhotos';

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
  const photos = await fetchPhotos();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavBar />
          <PhotoProvider initialPhotos={photos ?? []}>{children}</PhotoProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
