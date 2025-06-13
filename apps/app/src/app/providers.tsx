"use client";

import { type ReactNode } from "react";
import { ThemeProvider, type UIProviderProps } from "@tazeai/ui/providers";
import { Toaster } from "@tazeai/ui/components/sonner";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: UIProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ThemeProvider {...themeProps}>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
