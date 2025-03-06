
import { Hono } from "hono";

import type { AppContext } from "../context";
import { zValidator } from "@hono/zod-validator";
import {z} from "zod";
import { authMiddleware } from "../auth/middleware";

const adminRoutes = new Hono<AppContext>()
    .use(authMiddleware)
    .get("/members", async (c) => {
        const db = c.get("db");
        
        const users = await db.query.memberTable.findMany();
        return c.json(users);
    })
    .get("/members/:id", 
        zValidator("param", z.object({
            id: z.string().pipe(z.coerce.number())
        })),
        async (c) => {
            const db = c.get("db");
            const { id } = c.req.valid("param")

            const member = await db.query.memberTable.findFirst({
                where: (member, {eq}) => eq(member.id, id)
            });
            
            return c.json(member);
        });

export { adminRoutes };
