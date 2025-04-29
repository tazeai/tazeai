import { createEnv, z } from '@tazeai/env';
import { envs as auth } from '@tazeai/auth/envs';
import { envs as database } from '@tazeai/database/envs';
// import { envs as email } from '@tazeai/mailers/envs';
// import { envs as sentry } from '@tazeai/sentry/envs';

export const env = createEnv({
  extends: [auth(), database()],
  server: {},
  client: {},
  runtimeEnv: {},
});
