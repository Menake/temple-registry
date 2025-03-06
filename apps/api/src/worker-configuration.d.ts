import { Context } from 'hono'

declare global {
  type Bindings = {
    DB: D1Database
    ENVIRONMENT: string
    WEB_REDIRECT_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_REDIRECT_URI: string
  }

  export type APIContext = Context<{
    Bindings: Bindings
  }>
}

export default global