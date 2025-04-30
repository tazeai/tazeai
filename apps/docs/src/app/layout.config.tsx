import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ThemeSwitcher } from '@tazeai/ui/components/theme-switch';
import { i18n } from '@/lib/i18n';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/images/logo.png"
            alt="Taze AI"
            width={24}
            height={24}
            className="rounded-full"
          />
          Taze AI
        </>
      ),
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
    ],
    themeSwitch: {
      enabled: true,
      mode: 'light-dark-system',
      component: <ThemeSwitcher />,
    },
    githubUrl: 'https://github.com/tazeai/tazeai',
    i18n,
  };
}
