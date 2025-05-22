'use client';

import { i18nResolver } from 'locales/i18n.resolver';
import { getI18nSettings } from 'locales/i18n.settings';
import { I18nProvider } from '@tazeai/i18n/provider';
import { Toaster } from '@tazeai/ui/components/sonner';
import { ThemeProvider, type UIProviderProps } from '@tazeai/ui/providers';
import { useMemo, type ReactNode } from 'react';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { Analytics } from '@vercel/analytics/next';
import Fingerprintjs from '@/components/fingerprintjs';

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string;
const isProduction = process.env.NODE_ENV === 'production';

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
    <FpjsProvider
      loadOptions={{
        apiKey: fpjsPublicApiKey,
      }}
    >
      <ThemeProvider {...themeProps}>
        <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
          <Toaster />
          {children}
          {isProduction && (
            <>
              <Fingerprintjs />
              <Analytics />
            </>
          )}
        </I18nProvider>
      </ThemeProvider>
    </FpjsProvider>
  );
}
