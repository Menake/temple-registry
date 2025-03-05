// import type { User, Session } from "@temple-registry/db/schema";
import type { Database } from "@temple-registry/db";

export type Env = {
  DB: D1Database;
  WORKER_ENV: "production" | "development";
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Variables = {
  db: Database;
//   user: User;
//   session: Session | null;
};

export interface AppContext {
  Bindings: Env;
  Variables: Variables;
}
