import { db } from '.';
import { seed, reset } from 'drizzle-seed';
import * as schemas from './schemas';

async function main() {
  await reset(db, schemas);
  await seed(db, schemas, { count: 100 });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
