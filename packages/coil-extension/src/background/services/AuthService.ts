import { EventEmitter } from 'events'

import SuperTokens from 'supertokens-website'
import { GraphQlClient } from '@coil/client'
import { inject, injectable } from 'inversify'

import { StoreProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'
import { BuildConfig } from '../../types/BuildConfig'

import { Logger, logger } from './utils'
import { ActiveTabLogger } from './ActiveTabLogger'
import { formatTipSettings } from './formatTipSettings.util'
import { SuperTokensService } from './supertokens/SuperTokensService'

/**
 ## Extension Authentication

 The extension will look in its own localStorage for a token, and if it's unable
 to find one there will it inject coil.com/handler.html (which has a liberal
 frame-ancestors CSP) as an iframe into the background page. It then uses
 iframe.contentWindow.postMessage to send a message to the content script running
 in the newly injected iframe. The content script will event.source.postMessage
 the token in response.

 ### Incognito Notes
 The manifest declares "incognito":"spanning" with ONE background page instance
 shared between contexts. If you log in,in one context, you'll be logged in
 everywhere. If you log out from one context, you'll be logged out everywhere.

 ### Site <-> Extension token synchronization
 - NOTE: With cookie-based auth and SuperTokens handling access token
 refreshes, it may not be necessary to have any of these interactions between
 the site and extension. This is because both the site and extension have
 logic to refresh the user's access token cookie, so any request to the
 Coil API should be authenticated.

 - TODO: However, we should confirm that the "incognito":"spanning" declaration
 in the manifest allows the extension to send stored cookies with API requests.

 - Every time you land on a coil.com frame the content script will send the
 coil.com token to the background page, which it will compare against its
 token, sending back the newest one to store on the site.

 - The extension will listen to coil_writeToken events which can be emitted
 with an empty string in the token field when logged out. In this case the
 extension will clear its token too.

 - If the extension sees an empty or null token on coil.com and the extension
 has a token (because of logging out while the extension was disabled
 and missing the logout event) it will inject the extensions token into the
 site. This supports convenient use of incognito contexts.

 We could do this only for incognito contexts and instead logout in normal
 contexts, but it's possible you could log in via an incognito context first,
 then see no token in a normal context, infer that the user had logged out, then
 very confusingly propagate this logged out state to the incognito context.

 We therefore check the site login state once on startup and logout from the
 extension if the user is logged out from the site.

 ### coil.com/handler.html
 This could be any path with a liberal CSP. The content of the page is not
 important, only that the content script can access localStorage for the domain.

 */
@injectable()
export class AuthService extends EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  private trace = (..._: unknown[]) => {}
  // console.log.bind(console, 'AuthService:trace')

  constructor(
    @inject(tokens.CoilDomain)
    private domain: string,
    @logger('AuthService')
    private log: Logger,
    @inject(tokens.StoreProxy)
    private store: StoreProxy,
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    private client: GraphQlClient,
    private activeTabs: ActiveTabLogger,
    private superTokens: SuperTokensService
  ) {
    super()
  }

  private _op: Promise<boolean> | null = null

  // TODO: what if the reason for failure is bad net ?
  async refreshAuthentication(): Promise<boolean> {
    let loggedIn = false
    try {
      const [resp, tipResp] = await Promise.all([
        this.client.whoAmI(),
        this.client.tipSettings()
      ])

      this.log('updateWhoAmi resp', resp.data)
      if (resp.data?.whoami && tipResp.data?.whoami) {
        this.store.user = {
          ...resp.data.whoami,
          ...formatTipSettings(tipResp.data)
        }
        loggedIn = true
      }
    } catch (e) {
      this.log('whoAmI failed', e.message)
    }

    if (!loggedIn) {
      // Then the popup browser icon will be set accordingly
      delete this.store.user
    }
    return loggedIn
  }

  async maybeRefreshAndStoreState(): Promise<boolean> {
    this.activeTabs.log(`maybeRefreshAndStoreState ${Date.now()}`)
    if (!this._op) {
      this._op = this.refreshAuthentication()
      this._op.catch(() => {
        this._op = null
      })
      this._op.then(() => {
        this._op = null
      })
    }
    return this._op
  }

  initialize() {
    this.superTokens.init()
  }

  isAuthenticated() {
    return Boolean(this.store.user)
  }
}
