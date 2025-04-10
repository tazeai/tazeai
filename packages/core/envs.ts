import { createEnv } from '@t3-oss/env-nextjs';

export const envs = () =>
  createEnv({
    server: {},
    runtimeEnv: {},
  });
