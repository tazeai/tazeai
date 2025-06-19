'use client';

import { cn } from '@tazeai/ui/lib/utils';
import { Label as LabelPrimitive } from 'radix-ui';
import type * as React from 'react';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'select-none font-medium text-foreground text-sm leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
