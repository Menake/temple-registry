
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from "hono";

import type { AppContext } from "../context";
import { HTTPException } from "hono/http-exception";

const adminRoutes = new Hono<AppContext>()
    .use("*", clerkMiddleware())
    .get("/members", async (c) => {
        const db = c.get("db");
        const auth = getAuth(c);

        if (auth?.sessionClaims?.metadata.role !== "admin") 
            throw new HTTPException(403);
        
        const users = await db.query.users.findMany();
        return c.json(users);
    });

export { adminRoutes };
