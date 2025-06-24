import { AnalyticsProvider } from '@tazeai/analytics';
import { Toaster } from '@tazeai/ui/components/sonner';
import { ThemeProvider, type UIProviderProps } from '@tazeai/ui/providers';
import { type ReactNode } from 'react';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: UIProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ThemeProvider {...themeProps}>
      <AnalyticsProvider>
        <Toaster />
        {children}
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
