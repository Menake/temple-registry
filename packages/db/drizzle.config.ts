import { defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./schema.ts",
    out: "./migrations",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID!,
        databaseId: process.env.DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_API_TOKEN!
    }
})
