"use client";

import { useState, useEffect } from "react";
import { Button } from "@tazeai/ui/components/button";
import { ThemeSwitcher } from "@tazeai/ui/components/theme-switch";
import { Sheet, SheetContent, SheetTrigger } from "@tazeai/ui/components/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@tazeai/ui/lib/utils";
import { authConfig } from "config/auth";
import OneTap from "../../(auth)/_components/one-tap";
import { useSession } from "@tazeai/auth/client";
import { UserButton } from "../../../components/user-button";

const NavLink = ({
  href,
  children,
  target,
}: { href: string; children: React.ReactNode; target?: string }) => (
  <Link
    href={href}
    target={target}
    className="text-sm font-medium transition-colors hover:text-primary"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between py-4 max-w-7xl">
        <div className="flex items-center gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-primary rounded-full"></div>
            <span className="font-bold text-xl hidden md:inline-block">
              TazeAI
            </span>
          </a>

          <nav className="hidden md:flex gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="https://docs.tazeai.com" target="_blank">
              Docs
            </NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <div className="hidden md:flex gap-3">
            {session.data?.user ? (
              <UserButton />
            ) : session.isPending ? null : (
              <>
                <Link href={authConfig.pages.signIn}>
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href={authConfig.pages.signUp}>
                  <Button size="sm">Sign up</Button>
                </Link>
                <OneTap />
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col gap-4 px-6">
                <div className="flex items-center justify-between mb-8">
                  <a href="/" className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-primary rounded-full"></div>
                    <span className="font-bold text-xl">TazeAI</span>
                  </a>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <div className="flex flex-col gap-4 text-lg mb-8">
                  <a href="#features" className="py-2">
                    Features
                  </a>
                  <a href="#testimonials" className="py-2">
                    Testimonials
                  </a>
                  <a href="#pricing" className="py-2">
                    Pricing
                  </a>
                  <a href="#about" className="py-2">
                    About
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                  <Button className="w-full">Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
