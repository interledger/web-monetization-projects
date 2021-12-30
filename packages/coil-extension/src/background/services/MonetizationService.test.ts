import '@abraham/reflection'
import { Container, inject, injectable } from 'inversify'
import { makeLoggerMiddleware } from 'inversify-logger-middleware'
//
// // import { configureContainer } from '../configureContainer'
//
// // import { MonetizationService } from './MonetizationService'
import { GraphQlClient } from '@coil/client'

// import { decorateThirdPartyClasses } from '../../services/decorateThirdPartyClasses'
// import { AuthService } from './AuthService'
// import * as tokens from '../../types/tokens'
import { WextApi } from '@webmonetization/wext/tokens'

import { configureContainer } from '../configureContainer'
import { decorateThirdPartyClasses } from '../../services/decorateThirdPartyClasses'

import { AuthService } from './AuthService'
import { ActiveTabLogger } from './ActiveTabLogger'
import { MonetizationService } from './MonetizationService'
// import { SiteToken } from './SiteToken'
// import { logger, Logger } from './utils'
// import { LocalStorageProxy } from '../../types/storage'
// import { configureContainer } from '../configureContainer'

// @injectable()
// class B {
//   constructor(
//     @inject(tokens.CoilDomain)
//     private domain: string,
//     @logger('AuthService')
//     private log: Logger,
//     @inject(tokens.LocalStorageProxy)
//     private store: LocalStorageProxy,
//     private client: GraphQlClient,
//     private siteToken: SiteToken,
//     private activeTabs: ActiveTabLogger)
//   {
//   }
// }

describe('MonetizationService', () => {
  it('should be instantiable in tests via container construction', async () => {
    decorateThirdPartyClasses()
    // // const logger = makeLoggerMiddleware()
    //
    const container = new Container({
      defaultScope: 'Singleton',
      autoBindInjectable: true
    })

    // // container.applyMiddleware(logger)
    //
    const api = {
      tabs: {
        sendMessage: jest.fn(),
        query: jest.fn()
      }
    }
    configureContainer({
      container,
      buildConfig: {},
      coilDomain: 'https://coil.com',
      api,
      storage: localStorage,
      getActiveTab: async () => 0,
      loggingEnabled: true
    })
    //
    ;(window as any)['chrome'] = {}
    //
    // // container.bind(tokens.LocalStorageProxy).toConstantValue({})
    // // container.bind(tokens.Logger).toConstantValue(console.log)
    // container.bind(WextApi).toConstantValue(api)
    // // container.bind(tokens.CoilDomain).toConstantValue('https://coil.com')
    //
    // // const service = container.get(GraphQlClient)
    // const service3 = container.get(tokens.LocalStorageProxy)
    // const service4 = container.get(tokens.CoilDomain)
    // const service5 = container.get<typeof console.log>(tokens.Logger)
    // service5('asshole')
    // container.get(SiteToken)
    //
    localStorage.ACTIVE_TAB_LOGGING = 'true'
    const activeTabLogger = container.get(ActiveTabLogger)
    api.tabs.query.mockReturnValue([])
    activeTabLogger.log('why does not work')
    expect(api.tabs.query).toHaveBeenCalled()
    container.get(AuthService)
    container.getAsync(MonetizationService)
  })
})
