"use client";

import { i18nResolver } from "@/locales/i18n.resolver";
import { getI18nSettings } from "@/locales/i18n.settings";
import { AnalyticsProvider } from "@tazeai/analytics";
import { I18nProvider } from "@tazeai/i18n/provider";
import { Toaster } from "@tazeai/ui/components/sonner";
import { ThemeProvider, type UIProviderProps } from "@tazeai/ui/providers";
import { useMemo, type ReactNode } from "react";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: UIProviderProps;
  lang: string;
  userId?: string;
  userEmail?: string;
}

export function Providers({ children, themeProps, lang }: ProvidersProps) {
  const i18nSettings = useMemo(() => {
    return getI18nSettings(lang);
  }, [lang]);

  return (
    <ThemeProvider {...themeProps}>
      <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
        <AnalyticsProvider>
          <Toaster />
          {children}
        </AnalyticsProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
