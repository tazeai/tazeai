import assert from 'node:assert/strict';
import type { Config } from 'drizzle-kit';
import { envs } from './envs';

const env = envs();

console.log(env.DATABASE_URL);

assert(env.DATABASE_URL, 'Missing DATABASE_URL');

const config: Config = {
  schema: './schemas.ts',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
  casing: 'snake_case',
};

export default config;
