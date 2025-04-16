import { createEnv } from '@t3-oss/env-nextjs';
import { envs as cache } from '@tazeai/cache/envs';

export const envs = () =>
  createEnv({
    extends: [cache()],
    server: {},
    runtimeEnv: {},
  });
