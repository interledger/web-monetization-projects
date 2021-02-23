import { EventEmitter } from 'events'

import { GraphQlClient, tokenUtils } from '@coil/client'
import { inject, injectable } from 'inversify'

import { LocalStorageProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'

import { SiteToken } from './SiteToken'
import { Logger, logger } from './utils'
import { ActiveTabLogger } from './ActiveTabLogger'

@injectable()
export class AuthService extends EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  private trace = (..._: unknown[]) => {}

  constructor(
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private client: GraphQlClient,
    @inject(tokens.CoilDomain)
    private domain: string,
    @logger('AuthService')
    private log: Logger,
    private siteToken: SiteToken,
    private activeTabs: ActiveTabLogger
  ) {
    super()
  }

  promise: Promise<string | null> | null = null

  async getTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    this.activeTabs.log(`getTokenMaybeRefreshAndStoreState ${Date.now()}`)
    if (!this.promise) {
      this.promise = this.doGetTokenMaybeRefreshAndStoreState()
      this.promise.catch(() => {
        this.promise = null
      })
      this.promise.then(() => {
        this.promise = null
      })
    }
    return this.promise
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

    if (!token) {
      token = await this.siteToken.retrieve()
      this.activeTabs.log('siteToken: ' + Boolean(token))
    }
    this.trace('siteToken', token)

    if (!token || tokenUtils.isExpired({ token })) {
      this.activeTabs.log(
        `token is expired! token=${token && tokenUtils.decode(token)}`
      )
      token = null
    } else if (tokenUtils.isExpired({ token, withinHrs: 12 })) {
      // Update the stored token/user
      this.trace('before refreshTokenAndUpdateWhoAmi')
      token = await this.refreshTokenAndUpdateWhoAmi(token)
      this.activeTabs.log(
        `after refreshTokenAndUpdateWhoAmi token=${Boolean(token)}`
      )
      this.trace('after refreshTokenAndUpdateWhoAmi', token)
    } else {
      // Routinely do a whoami query to check for subscription status
      // Query could fail if token is invalid
      this.trace('before updateWhoAmI token=%s user=%s', token, this.store.user)
      const stored = token
      const endDate =
        this.store.user?.subscription?.endDate ||
        this.store.user?.subscription?.trialEndDate
      if (!endDate || new Date(endDate) < new Date()) {
        token = await this.updateWhoAmi(stored)
        this.activeTabs.log(`after updateWhoAmi token=${Boolean(token)}`)
      }
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
    const resp = await this.client.whoAmI(token)
    this.log('updateWhoAmi resp', resp.data)
    if (resp.data?.whoami) {
      this.store.user = {
        ...resp.data.whoami
      }
      return token
    } else {
      return null
    }
  }

  private async refreshTokenAndUpdateWhoAmi(token: string) {
    const resp = await this.client.queryToken(token)
    if (resp.data?.refreshToken?.token && resp.data?.whoami) {
      this.store.user = resp.data.whoami
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
