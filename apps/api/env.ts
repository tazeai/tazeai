import { createEnv } from '@t3-oss/env-nextjs';
import { envs as auth } from '@tazeai/auth/envs';
import { envs as database } from '@tazeai/database/envs';
import { envs as cache } from '@tazeai/cache/envs';

export const env = createEnv({
  extends: [auth(), database(), cache()],
  server: {},
  client: {},
  runtimeEnv: {},
});
