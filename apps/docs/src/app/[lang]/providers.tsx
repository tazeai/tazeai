'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import { locales } from '@/lib/i18n';
import { Translations } from 'fumadocs-ui/i18n';

export type ProvidersProps = {
  children: React.ReactNode;
  lang: string;
};

const cn: Partial<Translations> = {
  search: 'Translated Content',
  // other translations
};

export default function Providers({ children, lang }: ProvidersProps) {
  return (
    <RootProvider
      i18n={{
        locale: lang,
        locales,
        translations: { cn }[lang],
      }}
    >
      {children}
    </RootProvider>
  );
}
