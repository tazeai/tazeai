import { definedEnvs } from "@tazeai/env";

export const envs = definedEnvs(({ z }) => ({
  server: {
    OPENAI_API_KEY: z.string().min(1).optional(),
    OPENAI_PROXY_URL: z.string().min(1).url().optional(),
    DEEPSEEK_API_KEY: z.string().min(1).optional(),
    DEEPSEEK_PROXY_URL: z.string().min(1).url().optional(),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_PROXY_URL: process.env.OPENAI_PROXY_URL,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_PROXY_URL: process.env.DEEPSEEK_PROXY_URL,
  },
}));
