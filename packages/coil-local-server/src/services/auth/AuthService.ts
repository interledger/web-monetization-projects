import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import { Env } from '../util/env'

@injectable()
export class AuthService {
  constructor(private env: Env) {}

  async signJwt(val: object): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(val, this.env.APP_SECRET, (err, signed) => {
        if (err || !signed /* appease TS gods */) {
          reject(err)
        } else {
          resolve(signed)
        }
      })
    })
  }

  async verifyJwt(val: string): Promise<JwtPayload> {
    return new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(val, this.env.APP_SECRET, {}, (err, signed) => {
        if (err || typeof signed == 'undefined' || typeof signed === 'string') {
          reject(err)
        } else {
          resolve(signed)
        }
      })
    })
  }
}
