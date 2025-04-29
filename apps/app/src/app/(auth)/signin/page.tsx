'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignInForm } from '../_components/signin-form';
import { GuestGuard } from '../_components/guest-guard';

export default function SignInPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image
                src="/images/logo.png"
                alt="TazeAI"
                width={16}
                height={16}
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
