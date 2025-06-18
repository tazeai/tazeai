'use client';

import { Button } from '@tazeai/ui/components/button';
import type { ReactNode } from 'react';

interface EditButtonProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function EditButton({ href, className, children }: EditButtonProps) {
  return (
    <Button
      className={className}
      onClick={() => {
        window.open(href, '_blank');
      }}
      size="sm"
      variant="secondary"
    >
      {children}
    </Button>
  );
}
