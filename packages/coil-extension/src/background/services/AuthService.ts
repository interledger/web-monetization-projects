import { EventEmitter } from 'events'

import { GraphQlClient, tokenUtils } from '@coil/client'
import { inject, injectable } from 'inversify'

import { LocalStorage } from '../../types/storage'
import * as tokens from '../../types/tokens'

import { SiteToken } from './SiteToken'

@injectable()
export class AuthService extends EventEmitter {
  constructor(
    @inject(tokens.LocalStorage)
    private store: LocalStorage,
    private client: GraphQlClient,
    private siteToken: SiteToken
  ) {
    super()
  }

  async getTokenMaybeRefreshAndStoreState(): Promise<string | null> {
    let token = this.store.token || null
    const stored = token

    if (!token) {
      token = await this.siteToken.retrieve()
    }

    if (!token || tokenUtils.isExpired({ token })) {
      this.store.validToken = false
      delete this.store.user
      delete this.store.token
    } else {
      if (tokenUtils.isExpired({ token, withinHrs: 12 }) || !this.store.user) {
        const resp = await this.client.queryToken(token)
        if (
          resp.data &&
          resp.data.refreshToken &&
          resp.data.refreshToken.token &&
          resp.data.whoami
        ) {
          token = resp.data.refreshToken.token
          this.store.user = resp.data.whoami
          this.store.validToken = true
        } else {
          this.store.validToken = false
        }
      }
    }
    if (token && stored != token) {
      this.store.token = token
    }
    return token
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
