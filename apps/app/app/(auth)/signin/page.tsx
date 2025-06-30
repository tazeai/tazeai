'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GuestGuard } from '../_components/guest-guard';
import { SignInForm } from '../_components/signin-form';

export default function SignInPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            className="flex items-center gap-2 self-center font-medium"
            href="/"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image
                alt="TazeAI"
                height={16}
                src="/images/logo.png"
                width={16}
              />
            </div>
            TazeAI
          </Link>
          <SignInForm />
        </div>
      </div>
      <GuestGuard />
    </>
  );
}
