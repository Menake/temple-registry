import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod"

export const users = sqliteTable("users", {
    id: integer().primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    allowCommunications: integer("allow_communications", { mode: "boolean"}).notNull().default(false),
    phone: text(),
    createdAt: integer("created_at", {mode: "timestamp"}).$defaultFn(() => new Date()).notNull()
});

export const userInsertSchema = createInsertSchema(users);