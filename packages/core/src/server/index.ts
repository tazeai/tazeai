import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { db, type Database } from "@tazeai/db";
import { compress } from "hono/compress";
import { languageDetector } from "hono/language";
import type { HonoOptions } from "hono/hono-base";
import { type Cache, createCache } from "@tazeai/cache";
import { auth } from "@tazeai/auth";
import user from "./routes/user";
import { envs } from "../envs";
import ai from "./routes/ai";
import langchain from "./routes/langchain";

const env = envs();

type Variables = {
  db: Database;
  session?: Awaited<ReturnType<typeof auth.api.getSession>>;
  cache: Cache;
};

type Env = {
  Variables: Variables;
};

export interface ServerOptions extends HonoOptions<Env> {
  prefix?: string;
}

export class TazeAIServer extends Hono<Env> {
  private db: Database;
  // fix for hono base path
  private _basePath: string;

  constructor(options: ServerOptions) {
    const { prefix, ...rest } = options;
    super(rest);
    this._basePath = prefix ?? "/";
    this.db = db;
    const cache = createCache();

    // Middleware
    this.use(contextStorage());
    this.use(prettyJSON());
    this.use(requestId());
    this.use(cors());
    this.use(compress());
    this.use(logger());
    this.use(
      languageDetector({
        supportedLanguages: ["en", "zh"], // Must include fallback
        fallbackLanguage: "en", // Required
        lookupCookie: "lang",
        cookieOptions: {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          domain:
            process.env.NODE_ENV === "production" ? ".tazeai.com" : undefined,
        },
      }),
    );

    this.use("*", async (c, next) => {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });
      c.set("session", session);
      return next();
    });
    // Database
    this.use("*", async (c, next) => {
      c.set("db", this.db);
      c.set("cache", cache);
      await next();
    });

    // Routes
    this.route("/users", user);
    this.route("/ai", ai);
    this.route("/langchain", langchain);
    this.get("/redis", async (c) => {
      const now = Date.now();
      const cache = c.get("cache");
      const data = await cache.remember(
        "redis_status",
        () => {
          return Date.now();
        },
        30,
      );
      const time = Date.now() - now;
      return c.json({ message: "OK", data, time });
    });

    this.get("/db", async (c) => {
      const now = Date.now();
      const db = c.get("db");
      const users = await db.query.user.findMany();
      const time = Date.now() - now;
      return c.json({ message: "OK", users, time });
    });

    this.get("/health", async (c) => {
      return c.json({ message: "OK" });
    });

    this.notFound((c) => {
      console.log("Not Found", c.req.path);
      return c.json({ message: "Not Found" }, 404);
    });

    this.onError((err, c) => {
      console.error(err);
      return c.json({ message: "Internal Server Error" }, 500);
    });
  }
}

export { handle as vercel } from "hono/vercel";
