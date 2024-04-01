import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import Footer from '@/components/footer/footer';
import Providers from '@/providers/providers';

const manrope = Manrope({ subsets: ['latin'], weight: ['700', '500', '400'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <div className={styles.container}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
