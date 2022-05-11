import { Resolvers } from '../generated/graphql'

import { whoami } from './whoami'
import { adaptedPage } from './adaptedPage'
import { featureEnabled } from './featureEnabled'
import { login } from './login'
import { refreshToken } from './refreshToken'
import { refreshBtpToken } from './refreshBtpToken'
import { tip } from './tip'
import { tipPreview } from './tipPreview'
import { User_Tipping } from './User.tipping'
import { User_CurrencyPreferences } from './User.currencyPreferences'
import { minTipLimit } from './minTipLimit'

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
