import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './styles/globals.css';
import type { Translations } from 'fumadocs-ui/i18n';

const inter = Inter({
  subsets: ['latin'],
});

const cn: Partial<Translations> = {
  search: 'Translated Content',
  // other translations
};

const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: 'Chinese',
    locale: 'zh',
  },
];

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales,
            translations: { cn }[lang],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
