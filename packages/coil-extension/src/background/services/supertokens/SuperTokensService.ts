import type { CookieHandlerInterface } from 'supertokens-website/utils/cookieHandler/types'
import type { WindowHandlerInterface } from 'supertokens-website/utils/windowHandler/types'
import { inject, injectable } from 'inversify'
import SuperTokens from 'supertokens-website'

import { StoreProxy } from '../../../types/storage'
import * as tokens from '../../../types/tokens'
import { BuildConfig } from '../../../types/BuildConfig'
import { logger, Logger } from '../utils'

import { getCookie, setCookie } from './cookies'
import { SuperTokensLockService } from './SuperTokensLockService'

@injectable()
export class SuperTokensService {
  constructor(
    private locks: SuperTokensLockService,
    @inject(tokens.CoilDomain)
    private domain: string,
    @inject(tokens.StoreProxy)
    private store: StoreProxy,
    @logger('SuperTokensService')
    private log: Logger,
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  makeCookieHandler(): CookieHandlerInterface {
    this.log('makeCookieHandler called')
    return {
      setCookie: async (val: string) => {
        const args = setCookie({ cookie: val, domainUrl: this.domain })
        this.log('setting cookie', val, JSON.stringify(args))
        await this.api.cookies.set(args)
      },
      getCookie: async () => {
        const cookie = await getCookie({
          api: this.api,
          domainUrl: this.domain
        })
        this.log('get cookie', cookie)
        return cookie
      }
    }
  }

  /**
   * We only actually need location.getHostName and location.getOrigin
   */
  makeWindowHandler(): WindowHandlerInterface {
    this.log('makeWindowHandler called')
    return {
      localStorage: this.makeProxy('windowHandler.localStorage'),
      getWindowUnsafe: () => self,
      history: this.makeProxy('windowHandler.history'),
      location: this.makeProxy('windowHandler.location', {
        getHostName: () => 'coil.com',
        getOrigin: () => 'https://coil.com'
      } as Partial<WindowHandlerInterface['location']>),
      sessionStorage: this.makeProxy('windowHandler.sessionStorage'),
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
    // Initializing the SuperTokens library wraps the native fetch and
    // automates refreshing the user's access token after it's expired.
    SuperTokens.init({
      apiDomain: this.domain,
      apiBasePath: '/api/auth',
      override: {
        functions: (originalImplementation, builder) => {
          return {
            ...originalImplementation,
            addXMLHttpRequestInterceptor: () => {
              this.log('noop addXMLHttpRequestInterceptor')
            }
          }
        }
      },
      lockFactory: this.locks.getLock.bind(this.locks),
      cookieHandler: this.makeCookieHandler.bind(this),
      windowHandler: this.makeWindowHandler.bind(this)
    })

    SuperTokens.doesSessionExist().then(exists => {
      this.log('session exists', exists)
    })
  }
}
