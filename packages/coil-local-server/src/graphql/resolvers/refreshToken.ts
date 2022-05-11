import { QueryResolvers } from '../generated/graphql'

export const refreshToken: QueryResolvers['refreshToken'] = (
  parent,
  args,
  ctx,
  info
) => {
  return {
    token: '<JWT-TODO>'
  }
}
