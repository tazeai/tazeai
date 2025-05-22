'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@tazeai/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tazeai/ui/components/dropdown-menu';
import { LuSun, LuMoon, LuMonitor } from 'react-icons/lu';

const themes = [
  {
    label: 'Light',
    value: 'light',
    icon: LuSun,
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: LuMoon,
  },
  {
    label: 'System',
    value: 'system',
    icon: LuMonitor,
  },
];

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = themes.find((theme) => theme.value === resolvedTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Select theme">
          {currentTheme?.icon && (
            <currentTheme.icon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-32">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setTheme(theme.value)}
          >
            <theme.icon size={16} className="opacity-60" aria-hidden="true" />
            <span>{theme.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
