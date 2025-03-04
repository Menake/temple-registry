import { createDb } from '@temple-registry/db';

export const db = createDb(process.env.DB);
