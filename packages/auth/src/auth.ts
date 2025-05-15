import { db, nanoid, schemas, uuidv7 } from '@tazeai/database';
import { resend } from '@tazeai/email';
import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, apiKey, emailOTP, organization } from 'better-auth/plugins';
import { envs } from './envs';
import { redisStorage } from './storage';

const createConfig = (): BetterAuthOptions => {
  const env = envs();
  return {
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    secondaryStorage: redisStorage({
      url: env.REDIS_URL,
    }),
    baseURL: env.NEXT_PUBLIC_AUTH_URL,
    socialProviders: {
      github: {
        enabled: !!(
          env.AUTH_GITHUB_ID &&
          env.AUTH_GITHUB_SECRET &&
          env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === 'true'
        ),
        clientId: env.AUTH_GITHUB_ID ?? '',
        clientSecret: env.AUTH_GITHUB_SECRET ?? '',
      },
      google: {
        enabled: !!(
          env.AUTH_GOOGLE_ID &&
          env.AUTH_GOOGLE_SECRET &&
          env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === 'true'
        ),
        clientId: env.AUTH_GOOGLE_ID ?? '',
        clientSecret: env.AUTH_GOOGLE_SECRET ?? '',
      },
    },
    trustedOrigins: (req) => [
      req.headers.get('origin') ?? '',
      req.headers.get('referer') ?? '',
    ],
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: schemas,
    }),
    rateLimit: {
      enabled: false,
    },
    advanced: {
      database: {
        generateId: () => uuidv7(),
      },
      crossSubDomainCookies: {
        enabled: !!env.AUTH_DOMAIN,
        domain: env.AUTH_DOMAIN,
      },
      cookiePrefix: 'auth',
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const name =
              user.name.trim() || user.email.split('@')[0] || nanoid();
            const image =
              user.image || 'https://ui-avatars.com/api/?name=' + name;
            return {
              data: {
                name,
                image,
              },
            };
          },
        },
      },
    },
    plugins: [
      organization(),
      apiKey(),
      admin(),
      emailOTP({
        sendVerificationOTP: async (data, request) => {
          console.log('sendVerificationOTP', data, request);
          const { email, otp } = data;
          console.log('sendVerificationOTP', data, request);
          const result = await resend.emails.send({
            from: env.RESEND_FROM,
            to: email,
            subject: 'Verify your email',
            html: `Verify your email with the code: ${otp}`,
          });
          console.log('sendVerificationOTP result', result.data);
        },
      }),
    ],
  };
};

const config: BetterAuthOptions = createConfig();

export const auth = betterAuth(config);
