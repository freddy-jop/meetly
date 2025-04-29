import { getServerUrl } from '@/lib/get-server-url';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Meetly – Planifiez vos rendez-vous simplement',
  description: 'Créez, partagez et gérez vos disponibilités facilement.',
  metadataBase: new URL(getServerUrl()),
  icons: {
    icon: '/images/meetly-favicon.png',
  },
  applicationName: 'Meetly',
  creator: 'JOPHA Fredy',
  authors: [{ name: 'JOPHA Fredy', url: 'https://meetly-two.vercel.app' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
