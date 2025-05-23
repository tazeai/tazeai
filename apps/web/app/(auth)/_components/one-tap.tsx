"use client";

import { useEffect, useState } from "react";
import { useSession, client } from "@tazeai/auth/client";
import { env } from "@/env";

function OneTap() {
  const session = useSession();
  const [taped, setTaped] = useState(false);

  useEffect(() => {
    const isEnabled = env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED;
    if (!isEnabled) return;
    if (!session.data?.user && !session.isPending && !taped) {
      client.oneTap();
      setTaped(true);
    }
  }, [session]);

  return null;
}

export default OneTap;
