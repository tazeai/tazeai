import { user } from "../schemas";
import { db, eq } from "../index";

export const getUser = async (id: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.id, id),
  });
  return data;
};
