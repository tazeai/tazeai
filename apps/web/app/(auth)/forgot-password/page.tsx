'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ForgotPasswordForm } from '../_components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full text-primary-foreground">
            <Image
              alt="TazeAI"
              height={24}
              objectFit="cover"
              src="/images/logo.png"
              width={24}
            />
          </div>
          TazeAI
        </Link>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
