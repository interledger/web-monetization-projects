import btoa from 'btoa'
import fetch from 'node-fetch'
;

(global as any).btoa = btoa(global as any).fetch = fetch

import * as jwt from 'jsonwebtoken'

import { AnonymousTokens } from '../../src/index'
import { MockStore } from '../mocks/store'

const APP_SECRET = process.env.APP_SECRET || 'test'

// Integration test against the redeemer service running locally
describe('Anonymous tokens service', () => {
  let tokens: AnonymousTokens
  let coilAuthToken: string

  beforeEach(() => {
    coilAuthToken = jwt.sign(
      {
        agg: 1000000000000,
        userId: 'abcdefg'
      },
      APP_SECRET,
      {
        expiresIn: 3600 * 24
      }
    )

    tokens = new AnonymousTokens({
      redeemerUrl: 'http://localhost:8080/redeemer',
      signerUrl: 'http://localhost:8081/redeemer',
      store: new MockStore(),
      debug: console.debug,
      batchSize: 10
    })
  })

  it('should successfully get tokens issued', async () => {
    await (tokens as any).populateTokens(coilAuthToken)
  })
})
