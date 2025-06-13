import { createEnv } from "@tazeai/env";
import { envs as auth } from "@tazeai/auth/envs";
import { envs as database } from "@tazeai/db/envs";
import { envs as analytics } from "@tazeai/analytics/envs";

export const env = createEnv({
  extends: [auth(), database(), analytics()],
  server: {},
  client: {},
  runtimeEnv: {},
});
