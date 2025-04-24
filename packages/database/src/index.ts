export * from 'drizzle-orm/sql';
export { alias } from 'drizzle-orm/pg-core';
import { envs } from './envs';
import * as schemas from './schemas';
import { createClient } from './adapters/postgres';
export * from './utils';

const env = envs();

export const db = createClient<typeof schemas>({
  databaseUrl: env.DATABASE_URL,
  schema: schemas,
});

export type Database = typeof db;

export { envs, schemas };
export type { AnyColumn, SQL } from 'drizzle-orm';
export type {
  PgColumn,
  PgTableWithColumns,
  PgTable,
  TableConfig,
  TableLikeHasEmptySelection,
} from 'drizzle-orm/pg-core';

export * from './builder';
