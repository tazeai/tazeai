import { envs as analytics } from "@tazeai/analytics/envs";
import { envs as auth } from "@tazeai/auth/envs";
import { envs as database } from "@tazeai/db/envs";
import { createEnv } from "@tazeai/env";

export const env = createEnv({
  extends: [auth(), database(), analytics()],
  runtimeEnv: {},
  server: {},
  client: {},
});
