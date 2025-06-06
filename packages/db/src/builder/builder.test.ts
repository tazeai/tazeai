import { db, schemas } from "../index";
import { Builder } from ".";
import { describe, it, expect } from "vitest";

describe("Builder", () => {
  it("should paginate", async () => {
    const userBuilder = new Builder(db, schemas.user);
    const result = await userBuilder.paginate(1, { perPage: 10 });
    expect(result).toBeDefined();
  });
});
