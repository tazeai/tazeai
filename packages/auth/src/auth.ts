import { db, schemas, nanoid, uuidv7 } from '@tazeai/database';
import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, organization, apiKey } from 'better-auth/plugins';
import { envs } from './envs';
import { createCache } from '@tazeai/cache';

const env = envs();

const cache = createCache();

const config: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  secondaryStorage: {
    get: async (key) => {
      const value = await cache.get<string>(key);
      return value;
    },
    set: async (key, value) => {
      await cache.set(key, value);
    },
    delete: async (key) => {
      await cache.delete(key);
    },
  },
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  socialProviders: {
    github: {
      enabled: !!(env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET && env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === 'true'),
      clientId: env.AUTH_GITHUB_ID ?? '',
      clientSecret: env.AUTH_GITHUB_SECRET ?? '',
    },
    google: {
      enabled: !!(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET && env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === 'true'),
      clientId: env.AUTH_GOOGLE_ID ?? '',
      clientSecret: env.AUTH_GOOGLE_SECRET ?? '',
    },
  },
  trustedOrigins: (req) => [req.headers.get('origin') ?? '', req.headers.get('referer') ?? ''],
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
  advanced: {
    generateId: () => uuidv7(),
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
          const name = user.name.trim() || user.email.split('@')[0] || nanoid();
          const image = user.image || 'https://ui-avatars.com/api/?name=' + name;
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
  plugins: [organization(), apiKey(), admin()],
};

export const auth = betterAuth(config);
