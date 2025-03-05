import { Hono } from "hono";
import type { AppContext } from "./context";
import { createDb } from "@temple-registry/db";
import { logger } from "hono/logger";
import { devoteeRoutes } from "./devotee/routes";
import { adminRoutes } from "./admin/routes";

const app = new Hono<AppContext>()
  .use(logger())
  .use((c, next) => {   
    let db = c.get("db");
    if (!db) {
      db = createDb(c.env.DB)
      c.set("db", db);
    }
    return next();
  })
  .route("devotee", devoteeRoutes)
  .route("admin", adminRoutes);

export default app;  
export type AppType = typeof app