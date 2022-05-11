import { QueryResolvers } from '../../generated/graphql'

export const featureEnabled: QueryResolvers['featureEnabled'] = (
  parent,
  args,
  ctxt,
  info
) => {
  ctxt.log({ key: info.path.key, args })
  return true
}
