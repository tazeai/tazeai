import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Taze AI Docs',
    template: '%s | TazeAI Docs',
  },
  description: 'Taze AI Docs',
};

export default async function Layout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
