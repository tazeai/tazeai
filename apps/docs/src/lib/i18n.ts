import type { I18nConfig } from 'fumadocs-core/i18n';

export const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '简体中文',
    locale: 'zh',
  },
];

export const defaultLanguage = 'en';

export const i18n: I18nConfig = {
  defaultLanguage,
  languages: locales.map((locale) => locale.locale),
  hideLocale: 'never',
};
