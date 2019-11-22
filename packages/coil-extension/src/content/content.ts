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

function main(coilDomain: string) {
  decorateCoilClient()
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  container.bind(tokens.CoilDomain).toConstantValue(coilDomain)
  configureContainer(container)
  container.get(ContentScript).init()
}

function register() {
  const message: RegisterContentScript = { command: 'registerContentScript' }
  API.runtime.onMessage.addListener((message: ToContentMessage) => {
    if (message.command === 'setCoilDomain') {
      main(message.data.value)
    }
  })
  API.runtime.sendMessage(message)
}

register()
