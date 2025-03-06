import { and, eq } from 'drizzle-orm'
import {
  Google,
} from 'arctic'

import { createDb } from '@temple-registry/db'
import { userTable, oauthTable } from '@temple-registry/db/schema'
import { Provider, UserInfo } from '../interfaces'
import { AppContext } from "../../context"
import { Context } from "hono"
import { alphabet, generateRandomString } from "oslo/crypto"
import { SessionService } from "./session"

export class AuthService {
  private db: ReturnType<typeof createDb>
  private sessionService: SessionService
  public google: Google

  constructor(private ctx: Context<AppContext>) {
    this.db = createDb(this.ctx.env.DB);
    this.google = new Google(
      ctx.env.GOOGLE_CLIENT_ID,
      ctx.env.GOOGLE_CLIENT_SECRET,
      ctx.env.GOOGLE_REDIRECT_URI
    );
    this.sessionService = new SessionService(ctx);
  }
  
  private async checkForExistingUser(userInfo: UserInfo) {
    const existingUser = await this.db
      .select({ id: userTable.id, username: userTable.username })
      .from(oauthTable)
      .where(
        and(
          eq(oauthTable.providerId, userInfo.provider),
          eq(oauthTable.providerUserId, userInfo.id)
        )
      )
      .innerJoin(userTable, eq(userTable.id, oauthTable.userId))
      .get()

    return existingUser
  }

  private async createAccount(userId: string, userInfo: UserInfo) {
    try {
      const [[user], _] = await this.db.batch([
        this.db
          .insert(userTable)
          .values({
            id: userId,
            email: userInfo.email,
            username: userInfo.username
          })
          .returning(),
        this.db.insert(oauthTable).values({
          providerId: userInfo.provider,
          providerUserId: userInfo.id,
          userId,
        }),
      ])

      return user!
    } catch (error) {
      return { error: 'An unknown error occurred, try again later.' }
    }
  }

  public async authenticate(userInfo: UserInfo) {
    const existingUser = await this.checkForExistingUser(userInfo)

    if (existingUser) {
      return await this.sessionService.createSession(existingUser.id)
    }

    const alphabetPattern = alphabet("a-z", "0-9");
    const userId = generateRandomString(15, alphabetPattern);

    const newAccount = await this.createAccount(userId, userInfo)

    if ('error' in newAccount) return { error: newAccount.error }
    return await this.sessionService.createSession(userId)
  }

  public validateAuthorizationCode(
    code: string,
    provider: Provider,
    codeVerifier?: string
  ) {
    return this.google.validateAuthorizationCode(code, codeVerifier!)
  }
}