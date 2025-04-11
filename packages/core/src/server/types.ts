import type { Database } from '@tazeai/database';
import type { auth } from '@tazeai/auth';
import type { Context } from 'hono';

export type Variables = {
  db: Database;
  session?: Awaited<ReturnType<typeof auth.api.getSession>>;
};

export type Env = {
  Variables: Variables;
};

export type ApiContext = Context<Env>;
