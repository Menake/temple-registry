// import type { User, Session } from "@temple-registry/db/schema";
import type { Database } from "@temple-registry/db";
import { User } from "@temple-registry/db/schema";

export type Env = {
  DB: D1Database;
  WORKER_ENV: "production" | "development";
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  WEB_REDIRECT_URL: string;
  ON_LOGIN_REDIRECT_URI: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Variables = {
  db: Database;
  user: User;
};

export interface AppContext {
  Bindings: Env;
  Variables: Variables;
}
