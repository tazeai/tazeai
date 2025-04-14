'use client';

import { Button } from '@tazeai/ui/components/button';
import Link from 'next/link';
import { ThemeSwitcher } from '@tazeai/ui/components/theme-switch';

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/sign-in">
        <Button color="primary">Sign in</Button>
      </Link>
      <ThemeSwitcher />
    </div>
  );
}
