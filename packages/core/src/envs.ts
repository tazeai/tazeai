import { createEnv } from '@t3-oss/env-nextjs';
import { envs as cache } from '@tazeai/cache/envs';
import { envs as database } from '@tazeai/database/envs';

export const envs = () =>
  createEnv({
    extends: [cache(), database()],
    server: {},
    runtimeEnv: {},
  });
