import type { I18nConfig } from 'fumadocs-core/i18n';

export const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '简体中文',
    locale: 'zh-cn',
  },
  {
    name: '繁體中文',
    locale: 'zh-tw',
  },
];

const languages = locales.map((locale) => locale.locale);
export const defaultLanguage = languages[0]!;

export const i18n: I18nConfig = {
  defaultLanguage,
  languages,
  hideLocale: 'never',
};
