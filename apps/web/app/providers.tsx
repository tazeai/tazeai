'use client';

import { AnalyticsProvider } from '@tazeai/analytics';
import { I18nProvider } from '@tazeai/i18n/provider';
import { Toaster } from '@tazeai/ui/components/sonner';
import { ThemeProvider, type UIProviderProps } from '@tazeai/ui/providers';
import React, { type ReactNode, useMemo } from 'react';
import { i18nResolver } from '@/locales/i18n.resolver';
import { getI18nSettings } from '@/locales/i18n.settings';

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
      <I18nProvider resolver={i18nResolver} settings={i18nSettings}>
        <AnalyticsProvider>
          <Toaster />
          {children}
        </AnalyticsProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
