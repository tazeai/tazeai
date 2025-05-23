"use client";

import Link from "next/link";
import Image from "next/image";
import { SignUpForm } from "../_components/signup-form";
import { GuestGuard } from "../_components/guest-guard";

export default function SignUpPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="TazeAI"
                width={24}
                height={24}
                objectFit="cover"
              />
            </div>
            TazeAI
          </Link>
          <SignUpForm />
        </div>
      </div>
      <GuestGuard />
    </>
  );
}
