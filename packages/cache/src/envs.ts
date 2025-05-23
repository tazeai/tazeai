import { createEnv, z } from "@tazeai/env";

export const envs = () =>
  createEnv({
    server: {
      REDIS_URL: z.string().min(1).url(),
    },
    runtimeEnv: {
      REDIS_URL: process.env.REDIS_URL,
    },
  });
