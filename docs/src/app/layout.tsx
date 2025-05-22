import "@tazeai/ui/globals.css";
import "./styles/global.css";

import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TazeAI",
  description: "TazeAI Documentation",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
