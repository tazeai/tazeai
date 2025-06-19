'use client';

import { useSession } from '@tazeai/auth/client';
import { Button } from '@tazeai/ui/components/button';
import { Menu, X } from '@tazeai/ui/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@tazeai/ui/components/sheet';
import { ThemeSwitcher } from '@tazeai/ui/components/theme-switch';
import { cn } from '@tazeai/ui/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OneTap from '@/app/(auth)/_components/one-tap';
import { Logo } from '@/components/logo';
import { UserButton } from '@/components/user-button';
import { authConfig } from '@/config/auth';

const NavLink = ({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) => (
  <Link
    className="font-medium text-sm transition-colors hover:text-primary"
    href={href}
    target={target}
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        scrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <a className="flex items-center space-x-2" href="/">
            <Logo />
            <span className="hidden font-bold text-xl md:inline-block">
              TazeAI
            </span>
          </a>

          <nav className="hidden gap-6 md:flex">
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
          <div className="hidden gap-3 md:flex">
            {session.data?.user ? (
              <UserButton />
            ) : session.isPending ? null : (
              <>
                <Link href={authConfig.pages.signIn}>
                  <Button size="sm" variant="ghost">
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
              <Button className="md:hidden" size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="pr-0" side="right">
              <div className="flex flex-col gap-4 px-6">
                <div className="mb-8 flex items-center justify-between">
                  <a className="flex items-center space-x-2" href="/">
                    <div className="h-6 w-6 rounded-full bg-primary" />
                    <span className="font-bold text-xl">TazeAI</span>
                  </a>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <div className="mb-8 flex flex-col gap-4 text-lg">
                  <a className="py-2" href="#features">
                    Features
                  </a>
                  <a className="py-2" href="#testimonials">
                    Testimonials
                  </a>
                  <a className="py-2" href="#pricing">
                    Pricing
                  </a>
                  <a className="py-2" href="#about">
                    About
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full" variant="outline">
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
