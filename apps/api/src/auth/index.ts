import { Context, Hono } from "hono"
import { getCookie } from "hono/cookie"
import { OAuth2RequestError } from "arctic"

import { isAlreadyAuthenticated } from "./middleware"
import { googleProvider } from "./providers"
import { AuthService } from "./services/auth"
import { SessionService } from "./services/session"
import type {
  Provider,
  UserInfo,
  GoogleResponse,
} from "./interfaces"
import { AppContext } from "../context"

const authRoutes = new Hono<AppContext>()
  .use("/login/*", isAlreadyAuthenticated)
  .get("/login/google", async (ctx) => {
    const google = await googleProvider(ctx)
    return ctx.redirect(google)
  })
  .get("/login/google/callback", async (ctx) => {
    const storedCodeVerifier = getCookie(ctx, `code_verifier`)
    if (!storedCodeVerifier) {
      return ctx.json({ error: 'The code passed is incorrect or expired.' }, 400)
    }

    const fetchUserInfo = async (accessToken: string) => {
      const response = await fetch(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': 'request',
          },
        }
      )
      const googleResponse = (await response.json()) as GoogleResponse
      const userInfo: UserInfo = {
        id: googleResponse.sub,
        email: googleResponse.email,
        username: googleResponse.given_name,
        avatar: googleResponse.picture,
        provider: 'google',
      }
      return userInfo
    }

    return await handleOAuth2Callback(
      ctx,
      'google',
      fetchUserInfo,
      storedCodeVerifier
    )
    })
  .get("/me", async (ctx) => {
    const sessionService = new SessionService(ctx)
    const { user } = await sessionService.validateSession(ctx)
    return ctx.json(user)
  })
  .post("/logout", async (ctx) => {
    const sessionService = new SessionService(ctx)
    const logout = await sessionService.invalidateSession(ctx)
    return ctx.json(logout)
  })
  .post("session/validate", )


async function handleOAuth2Callback(
  ctx: Context<AppContext>,
  provider: Provider,
  fetchUserInfo: (accessToken: string) => Promise<UserInfo>,
  storeCodeVerifier?: string
) {
  const authService = new AuthService(ctx);
  const sessionService = new SessionService(ctx);
  const code = ctx.req.query('code')
  const state = ctx.req.query('state')
  const storedState = getCookie(ctx, `${provider}_oauth_state`)

  if (!code || !state || !storedState || state !== storedState) {
    return ctx.json({ error: 'The code passed is incorrect or expired.' }, 400)
  }

  try {
    const tokens = await authService.validateAuthorizationCode(
      code,
      provider,
      storeCodeVerifier
    )

    const userInfoResponse = await fetchUserInfo(tokens.accessToken())
    const authResponse = await authService.authenticate(userInfoResponse)
    if ('error' in authResponse) return ctx.json(authResponse.error)

    sessionService.setSessionTokenCookie(ctx, authResponse.sessionToken, authResponse.session.expiresAt)

    return ctx.redirect(ctx.env.ON_LOGIN_REDIRECT_URI);
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return ctx.json({ error: error.description }, 400)
    }
    return ctx.json(
      { error: 'An unknown error ocurred, try again later.' },
      500
    )
  }
}


export { authRoutes }