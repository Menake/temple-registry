import { defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./schema.ts",
    out: "./migrations",
    dbCredentials: {
        url: "../../apps/public/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/fd7ff0942dd009eceb4c7ebcfc3b5efcab826897d3180030b730082ddb656d86.sqlite"
    }
})
