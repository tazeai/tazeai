"use client";

import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { useEffect } from "react";

function Fingerprintjs() {
  const { data } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return null;
}

export default Fingerprintjs;
