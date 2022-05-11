import { QueryResolvers } from '../generated/graphql'

export const refreshBtpToken: QueryResolvers['refreshBtpToken'] = (
  parent,
  args,
  ctx,
  info
) => {
  return {
    token: '<JWT-TODO>'
  }
}
