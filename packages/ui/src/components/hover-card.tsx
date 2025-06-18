'use client';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@tazeai/ui/lib/utils';

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  showArrow = false,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> & {
  showArrow?: boolean;
}) {
  return (
    <HoverCardPrimitive.Content
      align={align}
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-lg outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot="hover-card-content"
      sideOffset={sideOffset}
      {...props}
    >
      {props.children}
      {showArrow && (
        <HoverCardPrimitive.Arrow className="-my-px fill-popover drop-shadow-[0_1px_0_var(--border)]" />
      )}
    </HoverCardPrimitive.Content>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
