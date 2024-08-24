import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dubenko photography',
  description: 'made to enjoy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
