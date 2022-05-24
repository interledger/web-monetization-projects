import { Resolvers } from '../generated/graphql'

import { whoami } from './Query/whoami'
import { adaptedPage } from './Query/adaptedPage'
import { featureEnabled } from './Query/featureEnabled'
import { login } from './Mutation/login'
import { refreshToken } from './Query/refreshToken'
import { refreshBtpToken } from './Query/refreshBtpToken'
import { tip } from './Mutation/tip'
import { tipPreview } from './Query/tipPreview'
import { User_Tipping } from './User/User.tipping'
import { User_CurrencyPreferences } from './User/User.currencyPreferences'
import { minTipLimit } from './Query/minTipLimit'

export const resolversRoot: Resolvers = {
  Mutation: {
    login,
    tip
  },
  Query: {
    whoami,
    adaptedPage,
    featureEnabled,
    refreshToken,
    refreshBtpToken,
    tipPreview,
    minTipLimit
  },
  User: {
    tipping: User_Tipping,
    currencyPreferences: User_CurrencyPreferences
  }
}
