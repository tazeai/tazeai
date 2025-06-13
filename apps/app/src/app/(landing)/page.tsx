"use client";

import { Button } from "@tazeai/ui/components/button";
import Link from "next/link";
import { ThemeSwitcher } from "@tazeai/ui/components/theme-switch";
import { UserButton } from "@/components/user-button";
import { authConfig } from "@/config/auth";
import { useSession } from "@tazeai/auth/client";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-2">
        {!session?.user && (
          <Link href={authConfig.pages.signIn}>
            <Button color="primary">Sign In</Button>
          </Link>
        )}
        <Link href="https://docs.tazeai.com" target="_blank">
          <Button color="primary">Docs</Button>
        </Link>
        <ThemeSwitcher />
        <UserButton />
      </div>
    </div>
  );
}
