import { useEffect, useLayoutEffect } from 'react';
import { isServer } from '@/utils/is-server';

const useIsomorphicEffect = isServer ? useEffect : useLayoutEffect;

export { useIsomorphicEffect };
