import { auth } from "@tazeai/auth";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/auth");

app.use(logger());
app.use(
  "*",
  cors({
    origin: (origin) => {
      console.log(origin);
      return origin;
    },
    credentials: true,
  }),
);

app.on(["POST", "GET"], "*", (c) => {
  return auth.handler(c.req.raw);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;

// export const config = { api: { bodyParser: false } };
