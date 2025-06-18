import { envs as cache } from '@tazeai/cache/envs';
import { envs as database } from '@tazeai/db/envs';
import { definedEnvs } from '@tazeai/env';

export const envs = definedEnvs(({ z }) => ({
  extends: [cache(), database()],
  server: {
    NODE_ENV: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
}));
