import { createEnv } from '@t3-oss/env-nextjs';
import { envs as auth } from '@tazeai/auth';
import { envs as database } from '@tazeai/database';

export const env = createEnv({
  extends: [auth(), database()],
  server: {},
  client: {},
  runtimeEnv: {},
});
