import type { Metadata } from 'next';
import { Providers } from './providers';
import { createI18nServerInstance } from '@/locales/i18n.server';
import { getTheme } from '@/libs/theme';
import { getFontsClassName } from '@/libs/fonts';
import '@/styles/globals.css';

const appName = 'TazeAI';

export const metadata: Metadata = {
  title: appName,
  applicationName: appName,
  description: appName,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: appName,
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language } = await createI18nServerInstance();
  const theme = await getTheme();
  const className = getFontsClassName(theme);
  return (
    <html lang={language} className={className} suppressHydrationWarning>
      <body>
        <Providers
          lang={language}
          themeProps={{ attribute: 'class', defaultTheme: theme }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
