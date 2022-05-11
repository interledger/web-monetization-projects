import { UserResolvers } from '../generated/graphql'

export const User_Tipping: UserResolvers['tipping'] = (
  parent,
  args,
  ctx,
  info
) => {
  return {
    totalTipCreditAmountCentsUsd: (100e2).toString(10),
    lastTippedAmountCentsUsd: (1e2).toString(10),
    limitRemainingAmountCentsUsd: (10e2).toString(10),
    totalCentsUsdTippedPast24Hours: (1e2).toString(10)
  }
}
