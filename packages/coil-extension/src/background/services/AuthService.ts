import { EventEmitter } from 'events'

import { GraphQlClient, tokenUtils } from '@coil/client'
import { inject, injectable } from 'inversify'

import { LocalStorageProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'

import { SiteToken } from './SiteToken'
import { Logger, logger } from './utils'

@injectable()
export class AuthService extends EventEmitter {
  constructor(
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private client: GraphQlClient,
    @inject(tokens.CoilDomain)
    private domain: string,
    @logger('AuthService')
    private log: Logger,
    private siteToken: SiteToken
  ) {
    super()
  }

  async getTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    let token = this.getStoredToken()
    this.log('storedToken', { domain: this.domain, token })

    if (!token) {
      token = await this.siteToken.retrieve()
    }
    this.log('siteToken', token)

    if (!token || tokenUtils.isExpired({ token })) {
      token = null
    } else if (tokenUtils.isExpired({ token, withinHrs: 12 })) {
      // Update the stored token/user
      this.log('doing refreshTokenAndUpdateWhoAmi')
      token = await this.refreshTokenAndUpdateWhoAmi(token)
      this.log('token after refreshTokenAndUpdateWhoAmi', token)
    } else {
      // Routinely do a whoami query to check for subscription status
      // Query could fail if token is invalid
      this.log('doing updateWhoAmI', token)
      token = await this.updateWhoAmi(token)
      this.log('token after updateWhoAmI', token)
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
        ...resp.data.whoami,
        canTip: true
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
