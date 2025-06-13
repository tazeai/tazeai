import type {
  CreateEnv,
  CreateSchemaOptions,
  DefaultCombinedSchema,
  ServerClientOptions,
  StandardSchemaDictionary,
  StandardSchemaV1,
  StrictOptions,
} from "@t3-oss/env-core";
import { z } from "zod";
import { createEnv as createEnvCore } from "@t3-oss/env-core";

const CLIENT_PREFIX = "NEXT_PUBLIC_" as const;
type ClientPrefix = typeof CLIENT_PREFIX;

type Options<
  TServer extends StandardSchemaDictionary,
  TClient extends Record<`${ClientPrefix}${string}`, StandardSchemaV1>,
  TShared extends StandardSchemaDictionary,
  TExtends extends Array<Record<string, unknown>>,
  TFinalSchema extends StandardSchemaV1<{}, {}>,
> = Omit<
  StrictOptions<ClientPrefix, TServer, TClient, TShared, TExtends> &
    ServerClientOptions<ClientPrefix, TServer, TClient> &
    CreateSchemaOptions<TServer, TClient, TShared, TFinalSchema>,
  "runtimeEnvStrict" | "runtimeEnv" | "clientPrefix"
> &
  (
    | {
        runtimeEnv: StrictOptions<
          ClientPrefix,
          TServer,
          TClient,
          TShared,
          TExtends
        >["runtimeEnvStrict"];
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

export function createEnv<
  TServer extends StandardSchemaDictionary = NonNullable<unknown>,
  TClient extends Record<
    `${ClientPrefix}${string}`,
    StandardSchemaV1
  > = NonNullable<unknown>,
  TShared extends StandardSchemaDictionary = NonNullable<unknown>,
  const TExtends extends Array<Record<string, unknown>> = [],
  TFinalSchema extends StandardSchemaV1<{}, {}> = DefaultCombinedSchema<
    TServer,
    TClient,
    TShared
  >,
>(
  options:
    | Options<TServer, TClient, TShared, TExtends, TFinalSchema>
    | ((p: { z: typeof z }) => Options<
        TServer,
        TClient,
        TShared,
        TExtends,
        TFinalSchema
      >),
): CreateEnv<TFinalSchema, TExtends> {
  const opts = typeof options === "function" ? options({ z }) : options;
  const client = typeof opts.client === "object" ? opts.client : {};
  const server = typeof opts.server === "object" ? opts.server : {};
  const shared = opts.shared;

  const runtimeEnv = opts.runtimeEnv
    ? opts.runtimeEnv
    : {
        ...process.env,
        ...opts.experimental__runtimeEnv,
      };

  return createEnvCore<
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
}

export function definedEnvs<
  TServer extends StandardSchemaDictionary = NonNullable<unknown>,
  TClient extends Record<
    `${ClientPrefix}${string}`,
    StandardSchemaV1
  > = NonNullable<unknown>,
  TShared extends StandardSchemaDictionary = NonNullable<unknown>,
  const TExtends extends Array<Record<string, unknown>> = [],
  TFinalSchema extends StandardSchemaV1<{}, {}> = DefaultCombinedSchema<
    TServer,
    TClient,
    TShared
  >,
>(
  options:
    | Options<TServer, TClient, TShared, TExtends, TFinalSchema>
    | ((p: { z: typeof z }) => Options<
        TServer,
        TClient,
        TShared,
        TExtends,
        TFinalSchema
      >),
): () => CreateEnv<TFinalSchema, TExtends> {
  return () => createEnv(options);
}
