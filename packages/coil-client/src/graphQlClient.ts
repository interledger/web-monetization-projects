import { inject, injectable } from '@dier-makr/annotations'

import { portableFetch } from './utils/portableFetch'
import { GraphQlResponse } from './types'
import {
  adaptedPage,
  featureEnabled,
  login,
  queryToken,
  refreshBtpToken,
  tip,
  tipPreview,
  tipSettings,
  whoAmI
} from './queries'

// Reference class for DI/reduct
@injectable()
export class GraphQlClientOptions {
  public coilDomain = 'https://coil.com'
  public fetch: typeof fetch = portableFetch
  public log?: typeof console.log
  public extraHeaders: Record<string, string> = {}
}

export interface GraphQlQueryParameters {
  query: string
  token?: string | null
  variables?: Record<string, unknown>
  noCredentials?: boolean
}

@injectable()
export class GraphQlClient {
  public static Options = GraphQlClientOptions
  protected readonly fetch: typeof fetch

  // If not instantiated in a browser-based environment, we'll
  // have to store the auth cookies and supply them manually.
  private readonly inBrowser: boolean
  private authCookies?: string

  public login = login
  public refreshBtpToken = refreshBtpToken
  public queryToken = queryToken
  public whoAmI = whoAmI
  public adaptedPage = adaptedPage
  public featureEnabled = featureEnabled
  public tipPreview = tipPreview
  public tip = tip
  public tipSettings = tipSettings

  public constructor(
    @inject(GraphQlClientOptions)
    private config: GraphQlClientOptions
  ) {
    this.inBrowser = typeof window !== 'undefined'
    this.fetch = this.config.fetch
  }

  public async authenticate(email: string, password: string): Promise<void> {
    const response = await this.fetch(
      `${this.config.coilDomain}/api/auth/signin`,
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          apiBasePath: this.config.coilDomain,
          rid: 'thirdpartyemailpassword',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formFields: [
            {
              id: 'email',
              value: email
            },
            {
              id: 'password',
              value: password
            }
          ]
        })
      }
    )
    if (!response.ok) {
      throw new Error('Unable to authenticate with the provided credentials')
    }
    if (!this.inBrowser) {
      const authCookies = response.headers.get('Set-Cookie')
      if (authCookies) {
        const matcher = /(sAccessToken|sIdRefreshToken|sRefreshToken)=([^;]+);/g
        this.authCookies = (authCookies.match(matcher) ?? []).join('')
      }
    }
    const data = await response.json()
    if (data.status.toUpperCase() !== 'OK') {
      throw new Error('Unable to authenticate with the provided credentials')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<T = any>({
    query,
    token = null,
    variables = {},
    noCredentials = false
  }: GraphQlQueryParameters): Promise<GraphQlResponse<T>> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...this.config.extraHeaders
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    } else if (this.authCookies) {
      headers.Cookie = this.authCookies
    }
    const init: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    }
    if (this.inBrowser || this.authCookies) {
      init.credentials = 'include'
    }
    if (noCredentials) {
      init.credentials = 'omit'
    }

    if (this.config.log) {
      const serialized = JSON.stringify(
        { ...init, body: { query, variables } },
        null,
        2
      )
      this.config.log('Domain:', this.config.coilDomain, 'Url:', serialized)
    }
    let res: Response
    try {
      res = await this.fetch(`${this.config.coilDomain}/gateway`, init)
    } catch (e) {
      throw new Error(
        `graphql query failed. failed to fetch, query=\`${query}\``
      )
    }
    if (!res.ok) {
      throw new Error(
        `graphql query failed. status=${res.status}, query=\`${query}\``
      )
    }
    return (await res.json()) as GraphQlResponse<T>
  }
}
