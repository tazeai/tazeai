'use client';

import { Button } from '@tazeai/ui/components/button';
import { LuUser } from 'react-icons/lu';
import { useSession } from '@tazeai/auth/client';

export default function UserButton() {
  const { data } = useSession();
  if (!data?.user) {
    return null;
  }

  return (
    <Button variant="ghost" size="icon">
      <LuUser className="h-4 w-4" />
    </Button>
  );
}
