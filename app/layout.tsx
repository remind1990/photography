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
  title: 'Dubenko photography',
  description: 'made to enjoy',
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
