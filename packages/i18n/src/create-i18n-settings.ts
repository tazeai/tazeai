import type { InitOptions } from 'i18next';

/**
 * Get i18n settings for i18next.
 * @param languages
 * @param language
 * @param namespaces
 */
export const createI18nSettings = ({
  languages,
  language,
  namespaces,
}: {
  languages: string[];
  language: string;
  namespaces?: string | string[];
}): InitOptions => ({
  supportedLngs: languages,
  fallbackLng: languages[0],
  detection: undefined,
  lng: language,
  preload: false,
  lowerCaseLng: true,
  fallbackNS: namespaces,
  missingInterpolationHandler: (text, value, options) => {
    console.debug(
      `Missing interpolation value for key: ${text}`,
      value,
      options,
    );
  },
  ns: namespaces,
  react: {
    useSuspense: true,
  },
});
