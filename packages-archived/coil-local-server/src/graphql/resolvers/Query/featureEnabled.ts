import { QueryResolvers } from '../../generated/graphql'

export const featureEnabled: QueryResolvers['featureEnabled'] = (
  parent,
  args,
  ctxt,
  info
) => {
  return true
}
