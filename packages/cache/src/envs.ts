import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envs = () =>
  createEnv({
    server: {
      REDIS_URL: z.string().min(1).url(),
    },
    runtimeEnv: {
      REDIS_URL: process.env.REDIS_URL,
    },
  });
