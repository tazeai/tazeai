import { cookies } from 'next/headers';

type Theme = 'light' | 'dark' | 'system';

/**
 * @name getTheme
 * @description Get the theme from the cookies or default theme.
 * @returns The theme.
 */
export async function getTheme() {
  const cookiesStore = await cookies();

  const themeCookie = cookiesStore.get('theme')?.value as Theme;

  return themeCookie ?? process.env.NEXT_PUBLIC_DEFAULT_THEME_MODE ?? 'light';
}
