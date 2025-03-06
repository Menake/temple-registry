import { generateCodeVerifier, generateState } from "arctic"
import { serializeCookie } from "oslo/cookie"

import { AuthService } from "../services/auth"
import { AppContext } from "../../context"
import { Context } from "hono"

async function googleProvider(ctx: Context<AppContext>): Promise<string> {
  const authService = new AuthService(ctx)
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  const url = authService.google.createAuthorizationURL(
      state,
      codeVerifier,
      ["profile", "email"]
  )

  ctx.header(
    "Set-Cookie",
    serializeCookie("google_oauth_state", state, {
      path: '/',
      maxAge: 60 * 10,
      httpOnly: true,
      secure: ctx.env.WORKER_ENV !== "development",
    }),
    { append: true }
  )

  ctx.header(
    "Set-Cookie",
    serializeCookie("code_verifier", codeVerifier, {
      path: '/',
      maxAge: 60 * 10,
      httpOnly: true,
      secure: ctx.env.WORKER_ENV !== "development",
    }),
    { append: true }
  )

  return url.toString()
}

export { googleProvider }