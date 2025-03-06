import { relations, type InferSelectModel } from "drizzle-orm";
import { integer, text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod"

export const memberTable = sqliteTable("members", {
    id: integer().primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    allowCommunications: integer("allow_communications", { mode: "boolean"}).notNull().default(false),
    phone: text(),
    createdAt: integer("created_at", {mode: "timestamp"}).$defaultFn(() => new Date()).notNull()
});

export const userTable = sqliteTable("users", {
    id: text().notNull().primaryKey(),
    email: text("email").unique().notNull(),
    username: text(),
    role: text({ enum: ["admin", "user"]}).default("user").notNull()
});

export const sessionTable = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at", {
		mode: "timestamp"
	}).notNull()
});

export const oauthTable = sqliteTable(
    'oauth_account',
    {
      providerId: text('provider_id').notNull(),
      providerUserId: text('provider_user_id').notNull(),
      userId: text('user_id')
        .notNull()
        .references(() => userTable.id),
    },
    (table) => [primaryKey({ columns: [table.providerId, table.providerUserId] })]
  )

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id],
    })
}));


export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;

export const memberInsertSchema = createInsertSchema(memberTable);
export const sessionInsertSchema = createInsertSchema(sessionTable);