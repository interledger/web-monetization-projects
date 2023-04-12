import { EventEmitter } from 'events'

import { GraphQlClient, tokenUtils } from '@coil/client'
import { inject, injectable } from 'inversify'

import { StoreProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'
import { TimeoutError } from '../../util/timeout'

import { SiteToken } from './SiteToken'
import { Logger, logger } from './utils'
import { ActiveTabLogger } from './ActiveTabLogger'
import { TippingService } from './TippingService'
import { formatTipSettings } from './formatTipSettings.util'

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
    private client: GraphQlClient,
    private siteToken: SiteToken,
    private activeTabs: ActiveTabLogger
  ) {
    super()
  }

  private _op: Promise<string | null> | null = null

  /*
  If the token is issued more than one day ago, refresh it, such that the
  token is always valid for at least 26-28 days.
   */
  queueTokenRefreshCheck() {
    const twelveHours = 12 * 60 * 60 * 1e3
    // Add some randomness to the interval so we
    // can't correlate when a user is active/inactive quite as easily
    const randomness = Math.random() * twelveHours
    setTimeout(() => {
      void this.getTokenMaybeRefreshAndStoreState()
      this.queueTokenRefreshCheck()
    }, twelveHours + randomness)
  }

  async checkForSiteLogoutAssumeFalseOnTimeout({
    isMv3 = false
  }: {
    isMv3?: boolean
  }): Promise<boolean> {
    try {
      const token = await this.siteToken.retrieve({ existingTabOnly: isMv3 })
      return !token
    } catch (e) {
      if (e instanceof TimeoutError) {
        return false
      } else if (e.message.startsWith('no_existing_tab')) {
        return false
      } else {
        throw e
      }
    }
  }

  async getTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    this.activeTabs.log(`getTokenMaybeRefreshAndStoreState ${Date.now()}`)
    if (!this._op) {
      this._op = this.doGetTokenMaybeRefreshAndStoreState()
      this._op.catch(() => {
        this._op = null
      })
      this._op.then(() => {
        this._op = null
      })
    }
    return this._op
  }

  tokenInvalid(token: string | null) {
    return !token || tokenUtils.isExpired({ token })
  }

  async doGetTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    this.activeTabs.log(`doGetTokenMaybeRefreshAndStoreState ${Date.now()}`)
    let token = this.getStoredToken()
    this.trace('storedToken', { domain: this.domain, token })
    this.activeTabs.log(
      `getStoredToken ${JSON.stringify({
        domain: this.domain,
        token: Boolean(token)
      })}`
    )

    if (this.tokenInvalid(token)) {
      token = await this.siteToken.retrieve({ existingTabOnly: false })
      this.activeTabs.log(`siteToken: ${Boolean(token)}`)
    }
    this.trace('siteToken', token)

    if (this.tokenInvalid(token) || !token /* Satisfy TypeScript */) {
      this.activeTabs.log(
        `token is null || expired! token=${token && tokenUtils.decode(token)}`
      )
      token = null
    } else if (tokenUtils.isStale({ token, staleHrsAfterIat: 24 })) {
      // We must keep the token fresh as possible, as we can't assume early on
      // in WM adoption that a user will a) visit coil.com or
      // b) visit a WM site often enough that we can refresh a token only when
      // it has nearly expired.

      // Update the stored token/user
      this.trace('before refreshTokenAndUpdateWhoAmi')
      token = await this.refreshTokenAndUpdateWhoAmi(token)
      this.activeTabs.log(
        `after refreshTokenAndUpdateWhoAmi token=${Boolean(token)}`
      )
      this.trace('after refreshTokenAndUpdateWhoAmi', token)
    } else {
      // Routinely do a whoami query to check for subscription status or
      // changes to other fields (e.g. canTip)
      // Query could fail if token is invalid
      this.trace('before updateWhoAmI token=%s user=%s', token, this.store.user)
      token = await this.updateWhoAmi(token)
      this.activeTabs.log(`after updateWhoAmi token=${Boolean(token)}`)
      this.trace('after updateWhoAmI token=%s user=%s', token, this.store.user)
    }

    if (token) {
      this.store.validToken = true
      this.store.token = token
    } else {
      this.store.validToken = false
      delete this.store.token
      delete this.store.user
    }
    return token
  }

  private async updateWhoAmi(token: string): Promise<string | null> {
    const [resp, tipResp] = await Promise.all([
      this.client.whoAmI(token),
      this.client.tipSettings(token)
    ])

    this.log('updateWhoAmi resp', resp.data)
    if (resp.data?.whoami && tipResp.data?.whoami) {
      this.store.user = {
        ...resp.data.whoami,
        ...formatTipSettings(tipResp.data)
      }

      return token
    } else {
      return null
    }
  }

  private async refreshTokenAndUpdateWhoAmi(token: string) {
    const [resp, tipResp] = await Promise.all([
      this.client.queryToken(token),
      this.client.tipSettings(token)
    ])

    if (
      resp.data?.refreshToken?.token &&
      resp.data?.whoami &&
      tipResp.data?.whoami
    ) {
      this.store.user = {
        ...resp.data.whoami,
        ...formatTipSettings(tipResp.data)
      }
      return resp.data.refreshToken.token
    } else {
      return null
    }
  }

  getStoredToken() {
    return this.store.token || null
  }

  syncSiteToken(site: string | null): string | null {
    const ext = this.getStoredToken()
    const newest = tokenUtils.newestToken({ ext, site })
    if (newest.which === 'site') {
      this.store.token = newest.token
    }
    return newest.token
  }
}
