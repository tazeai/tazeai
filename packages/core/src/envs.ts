import { createEnv, z } from '@tazeai/env';
import { envs as cache } from '@tazeai/cache/envs';
import { envs as database } from '@tazeai/database/envs';

export const envs = () =>
  createEnv({
    extends: [cache(), database()],
    server: {
      NODE_ENV: z.string().optional(),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
    },
  });
