import 'server-only';
import assert from 'node:assert/strict';
import { PostHog } from 'posthog-node';
import { envs } from '../envs';

const env = envs();

assert(env.NEXT_PUBLIC_POSTHOG_KEY, 'NEXT_PUBLIC_POSTHOG_KEY is not set');
assert(env.NEXT_PUBLIC_POSTHOG_HOST, 'NEXT_PUBLIC_POSTHOG_HOST is not set');

export const analytics = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
});
