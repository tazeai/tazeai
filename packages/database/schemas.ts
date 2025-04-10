import { pgTableCreator, uuid, text } from 'drizzle-orm/pg-core';
import { snakeCase } from 'lodash-es';
import { envs } from './envs';
import { uuidv7 } from './utils';

export type { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';

const env = envs();

const prefix = env.DATABASE_PREFIX ? `${env.DATABASE_PREFIX}_` : '';

export const pgTable = pgTableCreator((name) => `${prefix}${snakeCase(name)}`);

export enum SystemRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const user = pgTable('user', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: t.text('name').notNull(),
  email: t.text('email').notNull().unique(),
  emailVerified: t.boolean('email_verified').notNull(),
  image: t.text('image'),
  role: t.text('role'),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires'),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
}));

export type UserType = typeof user.$inferSelect;

export const session = pgTable('session', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  expiresAt: t.timestamp('expires_at').notNull(),
  token: t.text('token').notNull().unique(),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
  ipAddress: t.text('ip_address'),
  userAgent: t.text('user_agent'),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  activeOrganizationId: t.text('active_organization_id'),
  impersonatedBy: t.text('impersonated_by'),
}));

export const account = pgTable('account', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  accountId: t.text('account_id').notNull(),
  providerId: t.text('provider_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: t.text('access_token'),
  refreshToken: t.text('refresh_token'),
  idToken: t.text('id_token'),
  accessTokenExpiresAt: t.timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at'),
  scope: t.text('scope'),
  password: t.text('password'),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
}));

export const verification = pgTable('verification', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  identifier: t.text('identifier').notNull(),
  value: t.text('value').notNull(),
  expiresAt: t.timestamp('expires_at').notNull(),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
}));

export const organization = pgTable('organization', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: t.text('name').notNull(),
  slug: t.text('slug').unique(),
  logo: t.text('logo'),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
  metadata: t.text('metadata'),
}));

export const member = pgTable('member', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: t.text('role').$type<SystemRole>().default(SystemRole.USER).notNull(),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
}));

export const invitation = pgTable('invitation', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  email: t.text('email').notNull(),
  role: t.text('role').$type<SystemRole>().default(SystemRole.USER).notNull(),
  status: t.text('status').notNull(),
  expiresAt: t.timestamp('expires_at').notNull(),
  inviterId: uuid('inviter_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
}));

export const apikey = pgTable('apikey', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: t.text('name'),
  start: t.text('start'),
  prefix: t.text('prefix'),
  key: t.text('key').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  refillInterval: t.integer('refill_interval'),
  refillAmount: t.integer('refill_amount'),
  lastRefillAt: t.timestamp('last_refill_at'),
  enabled: t.boolean('enabled'),
  rateLimitEnabled: t.boolean('rate_limit_enabled'),
  rateLimitTimeWindow: t.integer('rate_limit_time_window'),
  rateLimitMax: t.integer('rate_limit_max'),
  requestCount: t.integer('request_count'),
  remaining: t.integer('remaining'),
  lastRequest: t.timestamp('last_request'),
  expiresAt: t.timestamp('expires_at'),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
  permissions: t.text('permissions'),
  metadata: t.text('metadata'),
}));

export const jwks = pgTable('jwks', (t) => ({
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  publicKey: t.text('public_key').notNull(),
  privateKey: t.text('private_key').notNull(),
  createdAt: t.timestamp('created_at').notNull(),
}));
