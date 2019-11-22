import { EventEmitter } from 'events'

import { GraphQlClient, tokenUtils } from '@coil/client'
import { inject, injectable } from 'inversify'

import { LocalStorageProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'

import { SiteToken } from './SiteToken'
import { CachedCoilDomainClient } from './CachedCoilDomainClient'

@injectable()
export class AuthService extends EventEmitter {
  constructor(
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private client: CachedCoilDomainClient,
    private siteToken: SiteToken
  ) {
    super()
  }

  async getTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    let token = this.getStoredToken()

    if (!token) {
      token = await this.siteToken.retrieve()
    }

    if (!token || tokenUtils.isExpired({ token })) {
      token = null
    } else if (tokenUtils.isExpired({ token, withinHrs: 12 })) {
      // Update the stored token/user
      token = await this.refreshTokenAndUpdateWhoAmi(token)
    } else {
      // Routinely do a whoami query to check for subscription status
      // Query could fail if token is invalid
      token = await this.updateWhoAmi(token)
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
    const resp = await this.client.get().whoAmI(token)
    if (resp.data?.whoami) {
      this.store.user = resp.data.whoami
      return token
    } else {
      return null
    }
  }

  private async refreshTokenAndUpdateWhoAmi(token: string) {
    const resp = await this.client.get().queryToken(token)
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
