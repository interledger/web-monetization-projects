import { MutationResolvers } from '../../generated/graphql'
import { userFromContext } from '../../utils/userFromContext'
import { tokenForContextUser } from '../../utils/tokenForContextUser'

export const login: MutationResolvers['login'] = async (
  parent,
  args,
  ctx,
  info
) => {
  // TODO, userId would not be set here so must be "looked up"
  const user = userFromContext(ctx)
  const token = await tokenForContextUser(ctx)
  ctx.res.cookie('coil-user', token, {
    httpOnly: true,
    // It's never sent with unsecured HTTP (except on localhost)
    secure: true,
    sameSite: 'strict',
    // no need to sign a jwt
    signed: false
  })
  return {
    token,
    user
  }
}
