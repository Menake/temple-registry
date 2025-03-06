import { MiddlewareHandler } from "hono"
import { SessionService } from "../services/session"
import { env } from "hono/adapter"

export const isAlreadyAuthenticated: MiddlewareHandler = async (ctx, next) => {
  const sessionService = new SessionService(ctx)
  const { user } = await sessionService.validateSession(ctx)

  if (user) {
    return ctx.json({ error: 'Already logged in.' }, 401)
  }

  await next()
}

export const authMiddleware: MiddlewareHandler = async (ctx, next) => { 
  const originHeader = ctx.req.header("Origin") ?? ctx.req.header("origin");
  const hostHeader = ctx.req.header("Host") ?? ctx.req.header("X-Forwarded-Host");
  if (
    (!originHeader || !hostHeader) &&
    env(ctx).WORKER_ENV === "production" &&
    ctx.req.method !== "GET"
  ) {
    return new Response(null, {
      status: 403,
    });
  }

  const sessionService = new SessionService(ctx)
  const { user } = await sessionService.validateSession(ctx)

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (user.role !== "admin")
    return new Response("Unauthorized", { status: 403 });

  ctx.set("user", user);
  await next();
};
