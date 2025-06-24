import { definedEnvs } from '@tazeai/env';

export const envs = definedEnvs(({ z, env }) => ({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().startsWith('phc_').optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().startsWith('G-').optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
}));
