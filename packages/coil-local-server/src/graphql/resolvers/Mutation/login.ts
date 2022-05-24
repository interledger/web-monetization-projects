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
  return {
    token,
    user
  }
}
