import { getFontsClassName } from '@/libs/fonts';
import { getTheme } from '@/libs/theme';
import { createI18nServerInstance } from '@/locales/i18n.server';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

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
