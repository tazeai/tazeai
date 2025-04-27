import { createEnv, z } from '@tazeai/env';

export const envs = () =>
  createEnv({
    server: {
      RESEND_FROM: z.string().min(1),
      RESEND_TOKEN: z.string().min(1).startsWith('re_'),
    },
    runtimeEnv: {
      RESEND_FROM: process.env.RESEND_FROM,
      RESEND_TOKEN: process.env.RESEND_TOKEN || process.env.AUTH_RESEND_KEY,
    },
  });
