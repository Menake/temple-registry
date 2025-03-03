import { drizzle, type AnyD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

export const createDb = (client: AnyD1Database) => drizzle(client, { schema });