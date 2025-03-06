import { defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./schema.ts",
    out: "./migrations",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
    }
})
