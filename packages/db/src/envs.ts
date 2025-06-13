import { definedEnvs } from "@tazeai/env";

export const envs = definedEnvs(({ z }) => ({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_PREFIX: z.string().min(1).optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
  },
}));
