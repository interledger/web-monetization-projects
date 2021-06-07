import { DecodedToken, decodeToken } from './utils/tokens'

export type NewestTokenReturn =
  | {
      token: string
      which: string
    }
  | {
      token: null
      which: null
    }

export interface IsExpiredParams {
  token: string
  withinHrs?: number
  nowSeconds?: number
}

export interface IsStaleParams {
  token: string
  staleHrsAfterIat?: number
  nowSeconds?: number
}

export class CoilTokenUtils {
  public decode(token: string) {
    return decodeToken(token)
  }

  public newestToken(
    tokensMap: Record<string, string | null>,
    nowSeconds = Date.now() / 1e3
  ): NewestTokenReturn {
    const entries = Object.entries(tokensMap)

    if (entries.length !== 2) {
      throw new Error(
        `invalid_arg: expecting 2 tokens, found: ${entries.length}`
      )
    }

    const noToken = { token: null, which: null }
    const tokensNullFiltered = entries.filter(([_, token]) => token != null)

    const tokens = tokensNullFiltered.map(([name, tok], ix) => {
      return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [this.decode(tok!), ix, tok, name] as [
          DecodedToken,
          number,
          string,
          string
        ]
      )
    })

    const tokensSorted = tokens.sort(
      ([{ exp, iat }], [{ exp: exp2, iat: iat2 }]) => {
        // eslint-disable-next-line no-nested-ternary
        return iat > iat2 ? 1 : exp > exp2 ? 1 : -1
      }
    )
    const tokensFiltered = tokensSorted.filter(([{ exp }]) => {
      return exp > nowSeconds
    })

    if (!tokensFiltered.length) {
      return noToken
    }
    // These are sorted from oldest to newest so take last
    const ix = tokensFiltered.length - 1
    return { token: tokensFiltered[ix][2], which: tokensFiltered[ix][3] }
  }

  isExpired({
    token,
    withinHrs = 0,
    nowSeconds = Date.now() / 1e3
  }: IsExpiredParams) {
    const now = new Date(nowSeconds * 1e3)
    const decoded = this.decode(token)
    now.setHours(now.getHours() + withinHrs)
    const expiredBy = now.getTime() / 1000
    return expiredBy >= decoded.exp
  }

  isStale({
    token,
    staleHrsAfterIat = 24,
    nowSeconds = Date.now() / 1e3
  }: IsStaleParams) {
    const now = new Date(nowSeconds * 1e3)
    const decoded = this.decode(token)
    const refreshAt = new Date(decoded.iat * 1e3)
    refreshAt.setHours(refreshAt.getHours() + staleHrsAfterIat)
    return now >= refreshAt
  }
}
