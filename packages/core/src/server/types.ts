import type { auth } from '@tazeai/auth';
import type { Cache } from '@tazeai/cache';
import type { Database } from '@tazeai/db';
import type { Context } from 'hono';

export type Variables = {
  db: Database;
  session?: Awaited<ReturnType<typeof auth.api.getSession>>;
  cache: Cache;
};

export type Env = {
  Variables: Variables;
};

export type ApiContext = Context<Env>;
