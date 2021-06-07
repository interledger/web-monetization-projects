import * as jwt from 'jsonwebtoken'

export interface DecodedToken {
  // expiry in seconds
  exp: number
  userId: string
  iat: number

  agg?: number
  throughput?: number
  currency?: string
  scale?: number
}

export function decodeToken(token: string): DecodedToken {
  return jwt.decode(token) as unknown as DecodedToken
}
