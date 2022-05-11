import { UserResolvers } from '../generated/graphql'

export const User_CurrencyPreferences: UserResolvers['currencyPreferences'] = (
  parent,
  args,
  context,
  info
) => {
  return {
    code: 'USD',
    scale: 1
  }
}
