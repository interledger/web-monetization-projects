import '@abraham/reflection'

import { Container } from 'inversify'

import { configureContainer } from '../configureContainer'
import { decorateThirdPartyClasses } from '../../services/decorateThirdPartyClasses'

import { MonetizationService } from './MonetizationService'

describe('MonetizationService', () => {
  it('should be instantiable in tests via container construction', async () => {
    decorateThirdPartyClasses()

    const container = new Container({
      defaultScope: 'Singleton',
      autoBindInjectable: true
    })

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
      wextApi: api,
      storage: localStorage,
      getActiveTab: async () => 0,
      loggingEnabled: true
    })

    expect(await container.getAsync(MonetizationService)).toBeInstanceOf(
      MonetizationService
    )
  })
})
