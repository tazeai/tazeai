import { Hono } from "hono";
import type { Env } from "../types";
import { schemas, ilike, desc, Builder } from "@tazeai/database";
import dayjs from "dayjs";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const db = c.get("db");
  const { page = 1, pageSize = 10, query = "" } = c.req.query();
  const where = query ? ilike(schemas.user.name, `%${query}%`) : undefined;
  const orderBy = [desc(schemas.user.createdAt)];
  const builder = new Builder(db, schemas.user);

  const result = await builder.paginate(page, {
    perPage: pageSize,
    orderBy,
    where,
  });

  return c.json({
    ...result,
    data: result.data.map((item) => ({
      ...item,
      status: item.banned ? "Banned" : "Active",
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    })),
  });
});

export default app;
