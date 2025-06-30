'use client';

import { useInView } from '@tazeai/ui/hooks/use-in-view';
import { cn } from '@tazeai/ui/lib/utils';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  duration?: number;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 800,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
  });

  const getTransform = () => {
    if (isInView) return 'translate3d(0, 0, 0) scale(1)';

    switch (direction) {
      case 'up':
        return 'translate3d(0, 60px, 0) scale(1)';
      case 'down':
        return 'translate3d(0, -60px, 0) scale(1)';
      case 'left':
        return 'translate3d(60px, 0, 0) scale(1)';
      case 'right':
        return 'translate3d(-60px, 0, 0) scale(1)';
      case 'scale':
        return 'translate3d(0, 0, 0) scale(0.8)';
      default:
        return 'translate3d(0, 60px, 0) scale(1)';
    }
  };

  return (
    <div
      ref={ref}
      className={cn('transition-all ease-out', className)}
      style={{
        transform: getTransform(),
        opacity: isInView ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
