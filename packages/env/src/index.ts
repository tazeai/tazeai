import type {
  CreateEnv,
  CreateSchemaOptions,
  DefaultCombinedSchema,
  ServerClientOptions,
  StandardSchemaDictionary,
  StandardSchemaV1,
  StrictOptions,
} from '@t3-oss/env-core';
import { createEnv as createEnvCore } from '@t3-oss/env-core';
import { z } from 'zod';

const CLIENT_PREFIX = 'NEXT_PUBLIC_' as const;
type ClientPrefix = typeof CLIENT_PREFIX;

type Env = typeof process.env;

type Options<
  TServer extends StandardSchemaDictionary,
  TClient extends Record<`${ClientPrefix}${string}`, StandardSchemaV1>,
  TShared extends StandardSchemaDictionary,
  TExtends extends Array<Record<string, unknown>>,
  TFinalSchema extends StandardSchemaV1<
    Record<string, unknown>,
    Record<string, unknown>
  >,
> = Omit<
  StrictOptions<ClientPrefix, TServer, TClient, TShared, TExtends> &
    ServerClientOptions<ClientPrefix, TServer, TClient> &
    CreateSchemaOptions<TServer, TClient, TShared, TFinalSchema>,
  'runtimeEnvStrict' | 'runtimeEnv' | 'clientPrefix'
> &
  (
    | {
        runtimeEnv: StrictOptions<
          ClientPrefix,
          TServer,
          TClient,
          TShared,
          TExtends
        >['runtimeEnvStrict'];
        experimental__runtimeEnv?: never;
      }
    | {
        runtimeEnv?: never;
        experimental__runtimeEnv: Record<
          | {
              [TKey in keyof TClient]: TKey extends `${ClientPrefix}${string}`
                ? TKey
                : never;
            }[keyof TClient]
          | {
              [TKey in keyof TShared]: TKey extends string ? TKey : never;
            }[keyof TShared],
          string | boolean | number | undefined
        >;
      }
  );

/**
 * Creates a type-safe environment configuration with validation
 *
 * @template TServer - Server-side environment variables schema
 * @template TClient - Client-side environment variables schema (must start with NEXT_PUBLIC_)
 * @template TShared - Shared environment variables schema
 * @template TExtends - Additional schemas to extend
 * @template TFinalSchema - Final combined schema type
 *
 * @param options - Configuration options or a function that returns options
 * @returns Validated environment configuration
 *
 * @example
 * ```typescript
 * const env = createEnv({
 *   server: {
 *     DATABASE_URL: z.string().url(),
 *   },
 *   client: {
 *     NEXT_PUBLIC_API_URL: z.string().url(),
 *   },
 *   runtimeEnv: process.env,
 * });
 * ```
 */
export function createEnv<
  TServer extends StandardSchemaDictionary = NonNullable<unknown>,
  TClient extends Record<
    `${ClientPrefix}${string}`,
    StandardSchemaV1
  > = NonNullable<unknown>,
  TShared extends StandardSchemaDictionary = NonNullable<unknown>,
  const TExtends extends Array<Record<string, unknown>> = [],
  TFinalSchema extends StandardSchemaV1<
    Record<string, unknown>,
    Record<string, unknown>
  > = DefaultCombinedSchema<TServer, TClient, TShared>,
>(
  options:
    | Options<TServer, TClient, TShared, TExtends, TFinalSchema>
    | ((p: {
        z: typeof z;
        env: Env;
      }) => Options<TServer, TClient, TShared, TExtends, TFinalSchema>)
): CreateEnv<TFinalSchema, TExtends> {
  const opts =
    typeof options === 'function'
      ? options({
          z,
          env: process.env,
        })
      : options;

  const client = typeof opts.client === 'object' ? opts.client : {};
  const server = typeof opts.server === 'object' ? opts.server : {};
  const shared = opts.shared;

  const runtimeEnv = opts.runtimeEnv
    ? opts.runtimeEnv
    : {
        ...(process.env || {}),
        ...opts.experimental__runtimeEnv,
      };

  const result = createEnvCore<
    ClientPrefix,
    TServer,
    TClient,
    TShared,
    TExtends,
    TFinalSchema
  >({
    ...opts,
    shared,
    client,
    server,
    clientPrefix: CLIENT_PREFIX,
    runtimeEnv,
  });

  return result;
}

/**
 * Creates a lazy-evaluated environment configuration factory
 * Useful for deferring environment validation until runtime
 *
 * @template TServer - Server-side environment variables schema
 * @template TClient - Client-side environment variables schema
 * @template TShared - Shared environment variables schema
 * @template TExtends - Additional schemas to extend
 * @template TFinalSchema - Final combined schema type
 *
 * @param options - Configuration options or a function that returns options
 * @returns Factory function that creates the environment configuration when called
 *
 * @example
 * ```typescript
 * const createAppEnv = definedEnvs({
 *   server: { DATABASE_URL: z.string().url() },
 *   client: { NEXT_PUBLIC_API_URL: z.string().url() },
 *   runtimeEnv: process.env,
 * });
 *
 * // Later in your app
 * const env = createAppEnv();
 * ```
 */
export function definedEnvs<
  TServer extends StandardSchemaDictionary = NonNullable<unknown>,
  TClient extends Record<
    `${ClientPrefix}${string}`,
    StandardSchemaV1
  > = NonNullable<unknown>,
  TShared extends StandardSchemaDictionary = NonNullable<unknown>,
  const TExtends extends Array<Record<string, unknown>> = [],
  TFinalSchema extends StandardSchemaV1<
    Record<string, unknown>,
    Record<string, unknown>
  > = DefaultCombinedSchema<TServer, TClient, TShared>,
>(
  options:
    | Options<TServer, TClient, TShared, TExtends, TFinalSchema>
    | ((p: {
        z: typeof z;
        env: Env;
      }) => Options<TServer, TClient, TShared, TExtends, TFinalSchema>)
): () => CreateEnv<TFinalSchema, TExtends> {
  let cached: CreateEnv<TFinalSchema, TExtends> | null = null;

  return () => {
    if (!cached) {
      cached = createEnv(options);
    }
    return cached;
  };
}
