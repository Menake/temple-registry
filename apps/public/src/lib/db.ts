import { createDb } from '@temple-registry/db';
import type { D1Database } from '@cloudflare/workers-types';

declare global {
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof createDb> | undefined;
}

let db: ReturnType<typeof createDb>;

if (!global._db) {
  const d1 = process.env.DB as D1Database;
  db = createDb(d1);
  global._db = db;
} else {
  db = global._db;
}

export { db };
