"use client";

import { Logo } from "@/components/logo";
import { Github } from "@tazeai/ui/components/icons";
import { Separator } from "@tazeai/ui/components/separator";

const Footer = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const copyright =
    currentYear > startYear ? `${startYear}-${currentYear}` : `${currentYear}`;

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Logo />
              <span className="font-bold text-xl">TazeAI</span>
            </div>
            <p className="mb-4 max-w-xs text-muted-foreground">
              Transforming businesses with powerful workflow solutions since{" "}
              {startYear}.
            </p>
            <div className="flex space-x-4">
              <a
                className="text-muted-foreground hover:text-primary"
                href="https://github.com/tazeai/tazeai"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-primary"
                  href="#"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {copyright} TazeAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              className="text-muted-foreground text-sm hover:text-primary"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-muted-foreground text-sm hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-muted-foreground text-sm hover:text-primary"
              href="#"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
