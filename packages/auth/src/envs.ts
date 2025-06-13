import { envs as cache } from "@tazeai/cache/envs";
import { envs as email } from "@tazeai/email/envs";
import { definedEnvs } from "@tazeai/env";

export const envs = definedEnvs(({ z }) => ({
  extends: [cache(), email()],
  client: {
    NEXT_PUBLIC_AUTH_GOOGLE_ID: z.string().min(1).optional(),
  },
  shared: {
    NEXT_PUBLIC_AUTH_URL: z.string().min(1).url(),
    NEXT_PUBLIC_AUTH_GITHUB_ENABLED: z.string().optional(),
    NEXT_PUBLIC_AUTH_GOOGLE_ENABLED: z.string().optional().default("false"),
  },
  server: {
    AUTH_GITHUB_ID: z.string().min(1).optional(),
    AUTH_GITHUB_SECRET: z.string().min(1).optional(),
    AUTH_RESEND_KEY: z.string().min(1).startsWith("re_").optional(),
    AUTH_SECRET: z.string().min(1),
    AUTH_DOMAIN: z.string().min(1).optional(),
    AUTH_GOOGLE_ID: z.string().min(1).optional(),
    AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
  },
  runtimeEnv: {
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    NEXT_PUBLIC_AUTH_GITHUB_ENABLED:
      process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED,
    NEXT_PUBLIC_AUTH_GOOGLE_ENABLED:
      process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED,
    NEXT_PUBLIC_AUTH_GOOGLE_ID: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
  },
}));
