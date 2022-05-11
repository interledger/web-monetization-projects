import { MutationResolvers } from '../generated/graphql'

import { userFromContext } from './whoami'

export const login: MutationResolvers['login'] = (parent, args, ctx, info) => {
  ctx.log({ key: `${info.fieldName}@${info.path.key}`, args })
  return {
    token: '<JWT-TODO>',
    user: userFromContext(ctx)
  }
}
