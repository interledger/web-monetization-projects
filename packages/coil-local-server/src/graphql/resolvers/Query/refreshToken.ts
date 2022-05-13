import { QueryResolvers } from '../../generated/graphql'
import { tokenForContextUser } from '../../utils/tokenForContextUser'

export const refreshToken: QueryResolvers['refreshToken'] = async (
  parent,
  args,
  ctx,
  info
) => {
  const token = await tokenForContextUser(ctx)
  return {
    token
  }
}
