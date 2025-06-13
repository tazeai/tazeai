import type { Metadata } from "next";
import { Providers } from "./providers";
import "@/styles/globals.css";

const appName = "TazeAI";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
