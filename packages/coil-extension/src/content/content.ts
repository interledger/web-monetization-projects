import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClient } from '@coil/client'

import * as tokens from '../types/tokens'
import { decorateCoilClient } from '../services/decorateThirdPartyClasses'
import { API, COIL_DOMAIN } from '../webpackDefines'
import { ClientOptions } from '../services/ClientOptions'
import { RegisterContentScript, ToContentMessage } from '../types/commands'

import { ContentScript } from './services/ContentScript'

function configureContainer(container: Container) {
  container.bind(tokens.ContentRuntime).toConstantValue(API.runtime)
  container.bind(tokens.Window).toConstantValue(window)
  container.bind(tokens.Storage).toConstantValue(localStorage)
  container.bind(tokens.Document).toConstantValue(document)
  container.bind(GraphQlClient.Options).to(ClientOptions)
}

const coilDomainStorageKey = API.runtime.getURL('/coil-domain')

function main(coilDomain: string = COIL_DOMAIN) {
  localStorage.setItem(coilDomainStorageKey, coilDomain)
  decorateCoilClient()
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  container.bind(tokens.CoilDomain).toConstantValue(coilDomain)
  configureContainer(container)
  container.get(ContentScript).init()
}

main(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  localStorage.getItem(coilDomainStorageKey)!
)
