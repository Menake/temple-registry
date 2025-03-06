import { Hono } from "hono";

import type { AppContext } from "../context";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { memberTable, userTable } from "@temple-registry/db/schema";

// Define the schema for form validation
export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  allowCommunications: z.boolean(),
});

const devoteeRoutes = new Hono<AppContext>()
  .post("/", zValidator("json", registerSchema),
    async (c) => {
      const db = c.get("db");

      const newMember = c.req.valid("json");

      const existingMember = await db.query.memberTable.findFirst({
        where: (member, {eq}) => eq(member.email, newMember.email)
      });

      const existingUser = await db.query.userTable.findFirst({
        where: (user, {eq}) => eq(user.email, newMember.email)
      })
    
      if (existingMember || existingUser) 
        throw new HTTPException(400, {
            message: "Someone has already registered with this email"
        });
    
      const [user] = await db.insert(memberTable).values(newMember).returning();

      return c.json(user);
    });

export { devoteeRoutes };
