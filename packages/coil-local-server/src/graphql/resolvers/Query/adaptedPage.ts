import { QueryResolvers } from '../../generated/graphql'

export const adaptedPage: QueryResolvers['adaptedPage'] = (
  parent,
  args,
  ctx,
  info
) => {
  ctx.log({ key: info.path.key, args })
  return {
    channelImage: undefined,
    paymentPointer: '$ilp.uphold.com/gRa4mXFEMYrL'
  }
}
