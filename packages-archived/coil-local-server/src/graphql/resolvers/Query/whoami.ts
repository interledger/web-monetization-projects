import { QueryResolvers } from '../../generated/graphql'
import { userFromContext } from '../../utils/userFromContext'

export const whoami: QueryResolvers['whoami'] = async (
  parent,
  args,
  context,
  info
) => {
  return userFromContext(context)
}
