import { Context } from '../../types/context'
import { AuthService } from '../../services/auth/AuthService'
import { User } from '../generated/graphql'

import { userFromContext } from './userFromContext'

export async function tokenForContextUser(ctx: Context, user?: User) {
  user ??= userFromContext(ctx)
  const auth = ctx.container.get(AuthService)
  const data = { userId: user.id }
  return auth.signJwt(data)
}
