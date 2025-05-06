import { createEnv } from '@tazeai/env';
import { envs as auth } from '@tazeai/auth/envs';
import { envs as database } from '@tazeai/database/envs';

export const env = createEnv({
  extends: [auth(), database()],
  server: {},
  client: {},
  runtimeEnv: {},
});
