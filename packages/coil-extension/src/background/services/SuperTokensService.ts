import type { CookieHandlerInterface } from 'supertokens-website/utils/cookieHandler/types'
import type { WindowHandlerInterface } from 'supertokens-website/utils/windowHandler/types'
import { inject, injectable } from 'inversify'
import SuperTokens from 'supertokens-website'

import { StoreProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'
import { BuildConfig } from '../../types/BuildConfig'

import { logger, Logger } from './utils'

@injectable()
export class SuperTokensService {
  constructor(
    @inject(tokens.CoilDomain)
    private domain: string,

    @inject(tokens.StoreProxy)
    private store: StoreProxy,

    @logger('SuperTokensService')
    private log: Logger,

    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig
  ) {}

  // TODO: we only actually need the async versions
  makeCookieHandler(): CookieHandlerInterface {
    this.log('makeCookieHandler called')
    return {
      setCookie: async val => {
        this.log(`setCookie ${val}`)
        this.store.superTokensCookie = val
      },
      getCookie: async () => {
        const cookie = this.getCookieFromStore()
        this.log(`getCookie ${cookie}`)
        return cookie
      },
      setCookieSync: val => {
        this.log(`setCookieSync ${val}`)
        this.store.superTokensCookie = val
      },
      getCookieSync: () => {
        const cookie = this.getCookieFromStore()
        this.log(`getCookieSync ${cookie}`)
        return cookie
      }
    }
  }

  private getCookieFromStore() {
    // TODO
    return this.store.superTokensCookie || ''
  }

  // TODO: we only actually need location.getHostName and location.getOrigin
  makeWindowHandler(): WindowHandlerInterface {
    this.log('makeWindowHandler called')
    return {
      // localStorage: this.makeProxy('windowHandler.localStorage'),
      getLocalStorage: () => {
        return this.makeProxy('windowHandler.getLocalStorage')
      },
      history: this.makeProxy('windowHandler.history'),
      location: this.makeProxy('windowHandler.location', {
        getHostName: () => 'coil.com',
        getOrigin: () => 'https://coil.com'
      } as Partial<WindowHandlerInterface['location']>),
      getSessionStorage: () =>
        this.makeProxy('windowHandler.getSessionStorage'),
      // sessionStorage: this.makeProxy('windowHandler.sessionStorage'),
      getDocument: this.makeProxy('windowHandler.document')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeProxy(name: string, obj: any = {}): any {
    return new Proxy(obj, {
      get: (target, prop) => {
        this.log(`requested ${String(prop)} field from ${name}`)
        if (obj[prop]) {
          return obj[prop]
        }
      }
    })
  }

  init() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anySelf = self as any

    if (this.buildConfig.isMV3) {
      anySelf.window = self
    }

    // Initializing the SuperTokens library wraps the native fetch and
    // automates refreshing the user's access token after it's expired.
    SuperTokens.init({
      apiDomain: this.domain,
      apiBasePath: '/api/auth',
      cookieHandler: this.makeCookieHandler.bind(this),
      windowHandler: this.makeWindowHandler.bind(this)
    })

    if (this.buildConfig.isMV3) {
      delete anySelf.window
    }
  }
}
