'use client';

import { useMemo, type ReactNode } from 'react';
import { I18nProvider } from '@tazeai/i18n/provider';
import { getI18nSettings } from '@/locales/i18n.settings';
import { i18nResolver } from '@/locales/i18n.resolver';
import { ThemeProvider, type UIProviderProps } from '@tazeai/ui/providers';
import { Toaster } from '@tazeai/ui/components/sonner';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: UIProviderProps;
  lang: string;
}

export function Providers({ children, themeProps, lang }: ProvidersProps) {
  const i18nSettings = useMemo(() => {
    return getI18nSettings(lang);
  }, [lang]);

  return (
    <ThemeProvider {...themeProps}>
      <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
        <Toaster />
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
