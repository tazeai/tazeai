import { count } from "drizzle-orm/sql";
import type {
  PgColumn,
  PgTable,
  SelectedFields,
  TableConfig,
} from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import type { Database } from "../index";

type PaginateOptions = {
  where?: SQL;
  perPage?: number | string;
  orderBy?: (PgColumn | SQL | SQL.Aliased)[];
};

const coverInt = (value: number | string | undefined, defaultValue = 1) => {
  if (value === undefined) return defaultValue;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return isNaN(value) ? defaultValue : Math.floor(value);
};

export class Builder<T extends TableConfig> {
  private db: Database;
  private table: PgTable<T>;
  private selectColumns: SelectedFields | undefined;

  constructor(db: Database, table: PgTable<T>) {
    this.db = db;
    this.table = table;
  }

  select(selectColumns: SelectedFields) {
    this.selectColumns = selectColumns;
    return this;
  }

  async paginate(page: number | string, options: PaginateOptions = {}) {
    const pageNumber = coverInt(page, 1);
    const perPage = coverInt(options.perPage, 10);
    const orderBy = options.orderBy ?? [];
    const where = options.where ?? undefined;
    const offset = (pageNumber - 1) * perPage;

    const start = Date.now();
    const [data, total] = await Promise.all([
      this.db
        .select()
        .from(this.table)
        .limit(perPage)
        .offset(offset)
        .orderBy(() => orderBy)
        .where(where),
      this.db
        .select({ count: count() })
        .from(this.table)
        .where(where)
        .then((res) => Number(res?.[0]?.count ?? 0)),
    ]);
    return {
      data,
      pagination: {
        currentPage: pageNumber,
        lastPage: Math.ceil(total / perPage),
        perPage,
      },
      total,
      duration: Date.now() - start,
    };
  }
}
