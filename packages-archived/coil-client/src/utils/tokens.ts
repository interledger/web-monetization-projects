import jwt from 'jsonwebtoken'

export interface DecodedToken {
  // expiry in seconds
  exp: number
  iat: number
  userId: string
}

export function decodeToken(token: string): DecodedToken {
  return jwt.decode(token) as unknown as DecodedToken
}
