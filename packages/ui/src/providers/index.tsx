"use client";

import type { ThemeProviderProps } from "next-themes";
import type { FC } from "react";
import { NextThemeProvider } from "./theme";

export type UIProviderProps = ThemeProviderProps;

export const ThemeProvider: FC<UIProviderProps> = ({
  children,
  ...properties
}: UIProviderProps) => {
  return <NextThemeProvider {...properties}>{children}</NextThemeProvider>;
};
