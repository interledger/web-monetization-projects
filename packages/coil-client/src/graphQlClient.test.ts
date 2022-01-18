import {
  decodeToken,
  GraphQlClient,
  loginMutation,
  queryTokenQuery
} from '@coil/client'
import fetch from 'node-fetch'

import { testToken } from '../test/fixtures/testToken'

describe('GraphQlClient#login', () => {
  it('should return a token via login method', async () => {
    const testFetch = jest.fn()

    class TestOptions extends GraphQlClient.Options {
      public fetch = testFetch
    }
    const response: Pick<Response, 'ok' | 'json'> = {
      ok: true,
      async json() {
        return { data: { auth: { token: testToken } } }
      }
    }
    testFetch.mockResolvedValue(response)

    const client = new GraphQlClient(new TestOptions())
    const password = 'thereisnoplacelikearstdhneio'
    const email = 'ndudfield@gmail.com'

    const token = await client.login(email, password)
    const params: Parameters<typeof fetch> = [
      'https://coil.com/gateway',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: ''
        },
        body:
          `{"query":${JSON.stringify(loginMutation)},` +
          `"variables":{"input":{"password":"${password}","email":"${email}"}}}`
      }
    ]
    expect(testFetch).toHaveBeenCalledWith(...params)
    expect(token).toBe(testToken)
    expect(decodeToken(token)).toStrictEqual({
      exp: 1567039068,
      iat: 1564619868,
      userId: 'cjyf1on2b8bs40706kfgy5wq2'
    })
  })

  it('should compose the queries correctly', () => {
    //! NOTE: This test fails if any changes are made to the whoami call.
    //! All the selections can match but if the spacing of the selections is condensed or even
    //! just off from some randomness the test will fail - again it fails because of tab indents or spacing
    //! if you get a failed test due to snapshots or a bunch of failed CI tests run yarn jest locally and
    //! see if this file is the problem. Should only happen if you update the whoami query.

    // This test seems pointless, but we had issues with auto generated
    // circular imports causing the whoami selection here to be `undefined`
    expect(queryTokenQuery).toMatchInlineSnapshot(`
      "{
        refreshToken {
          token
        }

        whoami {
          
          id
          fullName
          shortName
          email
          profilePicture
          customerId
          canTip

          subscription {
            active
            endDate
            trialEndDate
          }

          currencyPreferences {
            code
            scale
          }

          paymentMethods {
            id
            type
              details {
                ... on StripeCardDetails {
                last4
                brandCode
                status
              }
            }
          }

        }
      }"
    `)
  })
})
