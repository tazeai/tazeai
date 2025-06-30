import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from 'next-themes';
import { ThemeCookieProvider } from './theme-cookie';

export const NextThemeProvider = ({
  children,
  ...properties
}: ThemeProviderProps) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange={true}
    enableSystem={true}
    {...properties}
  >
    <ThemeCookieProvider theme={properties.defaultTheme ?? 'system'}>
      {children}
    </ThemeCookieProvider>
  </ThemeProvider>
);
