import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DisclaimerModal from '@/components/layout/DisclaimerModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prime Law Bharat | Advocates & Legal Consultants',
  description: 'Comprehensive Legal Solutions | Trusted Advocacy Across Forums in Maharashtra, Karnataka, Gujarat, Delhi, and Haryana.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased bg-[#0F1B2D] text-white flex flex-col min-h-screen selection:bg-[#8B2232]/40 selection:text-white`}>
        <DisclaimerModal />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
