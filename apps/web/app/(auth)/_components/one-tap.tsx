'use client';

import { useEffect, useState } from 'react';
import { useSession, client } from '@tazeai/auth/client';

function OneTap() {
  const session = useSession();
  const [taped, setTaped] = useState(false);

  useEffect(() => {
    if (!session.data?.user && !session.isPending && !taped) {
      client.oneTap();
      setTaped(true);
    }
  }, [session]);

  return null;
}

export default OneTap;
