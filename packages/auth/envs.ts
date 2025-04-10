import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envs = () =>
  createEnv({
    shared: {
      isProd: z.boolean(),
      NEXT_PUBLIC_AUTH_URL: z.string().min(1).url(),
    },
    server: {
      AUTH_GITHUB_ID: z.string().min(1).optional(),
      AUTH_GITHUB_SECRET: z.string().min(1).optional(),
      AUTH_RESEND_KEY: z.string().min(1).startsWith('re_').optional(),
      AUTH_SECRET: z.string().min(1),
      AUTH_DOMAIN: z.string().min(1).optional(),
      AUTH_GOOGLE_ID: z.string().min(1).optional(),
      AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
    },
    runtimeEnv: {
      AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
      AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
      AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
      AUTH_SECRET: process.env.AUTH_SECRET,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      isProd: process.env.NODE_ENV === 'production',
      NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
      AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
      AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    },
  });
