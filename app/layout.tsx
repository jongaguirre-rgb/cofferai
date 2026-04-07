import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'cofferai.com | Financial Research & Analysis',
  description:
    'Independent financial research and analysis on public companies, funds, and startups.',
  metadataBase: new URL('https://cofferai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cofferai.com',
    siteName: 'cofferai',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-bg-primary text-text-primary">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
