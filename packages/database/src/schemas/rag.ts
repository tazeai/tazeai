import {
  pgTable,
  uuid,
  text,
  vector,
  uniqueIndex,
  timestamp,
  integer,
  varchar,
  jsonb,
  unique,
} from 'drizzle-orm/pg-core';
import { user } from './auth';

export const timestamptz = (name: string) =>
  timestamp(name, { withTimezone: true });

export const chunks = pgTable(
  'chunks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    text: text('text'),
    abstract: text('abstract'),
    metadata: jsonb('metadata'),
    index: integer('index'),
    type: varchar('type'),
    clientId: text('client_id'),
    userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamptz('created_at').notNull().defaultNow(),
    updatedAt: timestamptz('updated_at').notNull().defaultNow(),
    accessedAt: timestamptz('accessed_at').notNull().defaultNow(),
  },
  (t) => [unique('chunks_client_id_user_id_unique').on(t.clientId, t.userId)],
);

export const embeddings = pgTable(
  'embeddings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    chunkId: uuid('chunk_id')
      .references(() => chunks.id, { onDelete: 'cascade' })
      .unique(),
    embeddings: vector('embeddings', { dimensions: 1024 }),
    model: text('model'),
    clientId: text('client_id'),
    userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade' }),
  },
  (t) => [
    unique('embeddings_client_id_user_id_unique').on(t.clientId, t.userId),
  ],
);
