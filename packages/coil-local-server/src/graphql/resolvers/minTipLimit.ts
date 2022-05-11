import { QueryResolvers } from '../generated/graphql'

export const minTipLimit: QueryResolvers['minTipLimit'] = (
  parent,
  args,
  ctx,
  info
) => {
  return {
    code: '200',
    message: '',
    success: true,
    minTipLimitAmountCentsUsd: '100'
  }
}
