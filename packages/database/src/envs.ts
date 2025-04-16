import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envs = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().min(1),
      DATABASE_PREFIX: z.string().min(1).optional(),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    },
  });
