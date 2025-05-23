"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import cookies from "js-cookie";
import type { ThemeProviderProps } from "next-themes";

const setCookieTheme = (theme: ThemeProviderProps["defaultTheme"]) => {
  if (!theme) {
    return;
  }

  console.log("setting cookie theme333", theme);

  try {
    cookies.set("theme", theme, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      expires: 365,
      sameSite: "Lax",
      domain: process.env.NODE_ENV === "production" ? ".tazeai.com" : undefined,
    });
  } catch (error) {
    console.error("error setting cookie theme", error);
  }
};

export function ThemeCookieProvider(props: {
  children: React.ReactNode;
  theme: ThemeProviderProps["defaultTheme"];
}) {
  const { theme: currentTheme, setTheme } = useTheme();

  useEffect(() => {
    if (currentTheme) {
      console.log("setting cookie theme", currentTheme);
      setCookieTheme(currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (props.theme) {
      setTheme(props.theme);
    }
  }, []);

  return props.children;
}
