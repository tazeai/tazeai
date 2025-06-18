import { useRef, useState } from 'react';
import { useEventListener } from './use-event-listener';

export function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);
  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);

  return [ref, value];
}
