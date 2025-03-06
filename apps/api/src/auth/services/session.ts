import { sessionTable } from "@temple-registry/db/schema"
import { createDb } from "@temple-registry/db";
import { AppContext } from "../../context";
import { Context } from "hono";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq } from "drizzle-orm";

export class SessionService {
    private db: ReturnType<typeof createDb>

    constructor(private ctx: Context<AppContext>) {
        this.db = this.ctx.get("db");
    }   
    
    private generateSessionToken(): string {
        // The session token should be a random string
        // generate 20 random bytes using the web crypto api
        const bytes = new Uint8Array(20);
        crypto.getRandomValues(bytes);
        
        // encode using the base32 encoding scheme because it is case insensitive compared
        // to bas64
        const token = encodeBase32LowerCaseNoPadding(bytes);
        return token;
    }
    
    public async createSession(userId: string) {
        // hash the session token and store it as the id
        // SHA-256 is a one-way hash function. This ensures that even if the database contents were leaked,
        // the attacker won't be able retrieve valid tokens.
        const token = this.generateSessionToken();
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    
        // Set the expiry to 30 days
        const session = {
          id: sessionId,
          userId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        };
      
        await this.db.insert(sessionTable).values(session);
        return {
            sessionToken: token,
            session
        };
    }

    public async validateSession(ctx: Context<AppContext>) {
        const authorizationHeader = ctx.req.header('Authorization');

        const sessionToken = authorizationHeader?.startsWith("Bearer ")
            ? authorizationHeader.substring(7, authorizationHeader.length)
            : "";

        if (!sessionToken) return { user: null, session: null }

        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
        const existingSession = await this.db.query.sessionTable.findFirst({
            with: {
                user: true,
            },
            where: (s, { eq }) => eq(s.id, sessionId),
        });

        if (!existingSession) {
            return { session: null, user: null };
        }

        // Is the session still within expiration (30 days)?
        if (Date.now() >= existingSession.expiresAt.getTime()) {
            await this.db.delete(sessionTable).where(eq(sessionTable.id, existingSession.id));
            return { session: null, user: null };
        }

        // We'll also extend the session expiration when it's close to expiration.
        // This ensures active sessions are persisted, while inactive ones will eventually expire.
        // We'll handle this by checking if there's less than 15 days (half of the 30 day expiration) before expiration.
        if (
            Date.now() >=
            existingSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
        ) {
            existingSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
            await this.db
                .update(sessionTable)
                .set({
                    expiresAt: existingSession.expiresAt,
                })
                .where(eq(sessionTable.id, existingSession.id));
        }

        return {
            session: {
                id: existingSession.id,
                expiresAt: existingSession.expiresAt,
                userId: existingSession.userId,
            },
            user: existingSession.user,
        };
    }

    public async invalidateSession(ctx: Context<AppContext>) {
        const { session } = await this.validateSession(ctx)
        if (!session) return null

        await this.db.delete(sessionTable).where(eq(sessionTable.id, session.id));
        return true
    }

    public async setSessionTokenCookie(ctx: Context<AppContext>, token: string, expiresAt: Date) {
        if (ctx.env.WORKER_ENV === "production") {
            ctx.header(
                "Set-Cookie",
                `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`
              )
        } else {
            ctx.header(
                "Set-Cookie",
                `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/;`
              )
        }
    }

    public async deleteSessionTokenCookie(ctx: Context<AppContext>) {
        if (ctx.env.WORKER_ENV === "production") {
            ctx.header("Set-Cookie", "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;")
        } else {
            ctx.header("Set-Cookie", "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/;")
        }
    }
}