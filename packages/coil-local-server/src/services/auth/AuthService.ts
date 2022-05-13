import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import { Env } from '../util/env'

@injectable()
export class AuthService {
  constructor(private env: Env) {}

  async signJwt(val: object, options?: jwt.SignOptions): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(val, this.env.APP_SECRET, options ?? {}, (err, signed) => {
        if (err || !signed /* appease TS gods */) {
          reject(err)
        } else {
          resolve(signed)
        }
      })
    })
  }

  async assertJwtVerified(
    val: string,
    options?: jwt.VerifyOptions
  ): Promise<JwtPayload> {
    return new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(val, this.env.APP_SECRET, options ?? {}, (err, signed) => {
        if (err || typeof signed == 'undefined' || typeof signed === 'string') {
          reject(err)
        } else {
          resolve(signed)
        }
      })
    })
  }

  async verifyJwt(val: string, options?: jwt.VerifyOptions) {
    try {
      await this.verifyJwt(val, options)
      return true
    } catch (e) {
      return false
    }
  }
}
