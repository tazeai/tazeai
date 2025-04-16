'use client';

import { Button } from '@tazeai/ui/components/button';
import Link from 'next/link';
import { ThemeSwitcher } from '@tazeai/ui/components/theme-switch';
import LanguageSwitcher from '@/components/language-switcher';
import { UserButton } from '@/components/user-button';
import { authConfig } from '@/config/auth';

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link href={authConfig.pages.signIn}>
        <Button color="primary">Sign in</Button>
      </Link>
      <LanguageSwitcher />
      <ThemeSwitcher />
      <UserButton />
    </div>
  );
}
