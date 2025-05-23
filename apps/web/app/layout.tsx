import { getFontsClassName } from "libs/fonts";
import { getTheme } from "libs/theme";
import { createI18nServerInstance } from "locales/i18n.server";
import type { Metadata } from "next";
import { Providers } from "./providers";

// Styles
import "../styles/globals.css";

const appName = "TazeAI";

const isProduction = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: appName,
  applicationName: appName,
  description: appName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appName,
  },
  icons: {
    icon: "/images/logo.png",
  },
  manifest: isProduction ? "/manifest.json" : undefined,
};

export const dynamic = "force-dynamic";

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
          themeProps={{ attribute: "class", defaultTheme: theme }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
