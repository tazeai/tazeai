"use client";

import Link from "next/link";
import { Button } from "@tazeai/ui/components/button";

export default function Error404() {
  return (
    <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
      <div className="w-full max-w-2xl p-6 text-center">
        <p className="pt-4 text-xl font-semibold text-gray-800 dark:text-dark-50">
          Oops. This Page Not Found.
        </p>
        <p className="pt-2 text-gray-500 dark:text-dark-200">
          This page you are looking not available. Please back to home
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button color="primary" className="h-11 text-base">
              Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
