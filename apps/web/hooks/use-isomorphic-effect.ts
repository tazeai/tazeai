import { isServer } from "@/utils/is-server";
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicEffect = isServer ? useEffect : useLayoutEffect;

export { useIsomorphicEffect };
