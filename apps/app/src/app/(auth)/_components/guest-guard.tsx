'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@tazeai/auth/client';

export function GuestGuard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user && !session.isPending) {
      router.push((searchParams.get('redirect') as string) || '/');
    }
  }, [searchParams, router, session]);

  return null;
}
