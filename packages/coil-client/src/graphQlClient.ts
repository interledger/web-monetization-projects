import { inject, injectable } from '@dier-makr/annotations'

import { portableFetch } from './utils/portableFetch'
import { GraphQlResponse } from './types'
import {
  adaptedPage,
  login,
  queryToken,
  refreshBtpToken,
  whoAmI
} from './queries'

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
  autoThrow?: boolean
  variables?: Record<string, unknown>
}

@injectable()
export class GraphQlClient {
  public static readonly Options = GraphQlClientOptions
  protected readonly fetch: typeof fetch

  public login = login
  public refreshBtpToken = refreshBtpToken
  public queryToken = queryToken
  public whoAmI = whoAmI
  public adaptedPage = adaptedPage

  public constructor(
    @inject(GraphQlClientOptions)
    protected config: GraphQlClientOptions = new GraphQlClientOptions()
  ) {
    this.fetch = this.config.fetch
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<T = any>({
    query,
    token = null,
    autoThrow = true,
    variables = {}
  }: GraphQlQueryParameters): Promise<GraphQlResponse<T>> {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...this.config.extraHeaders
      },
      body: JSON.stringify({ query, variables })
    }
    if (this.config.log) {
      const serialized = JSON.stringify(
        { ...init, body: { query, variables } },
        null,
        2
      )
      const redacted = token
        ? serialized.replace(token, '<redacted>')
        : serialized
      this.config.log('Domain:', this.config.coilDomain, 'Url:', redacted)
    }
    const res = await this.fetch(`${this.config.coilDomain}/graphql`, init)

    if (!res.ok && autoThrow) {
      throw new Error(
        `graphql query failed. status=${res.status} ` +
          `query=\`${query}\` text=${JSON.stringify(await res.text())}`
      )
    }
    return (await res.json()) as GraphQlResponse<T>
  }
}
