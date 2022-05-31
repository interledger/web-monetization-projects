import '@abraham/reflection'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'
import {
  adaptedPageQuery,
  featureEnabledQuery,
  loginMutation,
  queryTokenQuery,
  refreshBtpTokenQuery,
  tipPreviewQuery,
  tipQuery,
  tipSettingsQuery,
  whoamiQuery
} from '@coil/client'
import { Container } from 'inversify'
import express from 'express'

import { resolversRoot } from '../../src/graphql/resolvers/resolversRoot'
import { Context } from '../../src/types/context'
import { loadedSchemaString } from '../../src/graphql/loadedSchemaString'
import { AuthService } from '../../src/services/auth/AuthService'
import { Env } from '../../src/services/util/env'

// TODO:low better base64 matching
const jwtMatcher = expect.stringMatching(/[^.]+\.[^.]+\.[^.]+/)

describe('Testing Graphql Functions', () => {
  const typeDefs = loadedSchemaString
  const args = { typeDefs, resolvers: resolversRoot }
  const schema = makeExecutableSchema(args)
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  container.bind(Env).toSelf()
  container.bind(AuthService).toSelf()

  // TODO
  const req = {} as express.Request
  const res = {} as express.Response

  const contextValue: Context = {
    res,
    req,
    container,
    // TODO
    userId: '1',
    log: console.log.bind(console)
  }

  it('should execute the @coil/client whoamiQuery', async () => {
    const result = await graphql({ schema, source: whoamiQuery, contextValue })

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "whoami": Object {
            "canTip": false,
            "currencyPreferences": Object {
              "code": "USD",
              "scale": 1,
            },
            "customerId": null,
            "email": "niq@coil.com",
            "fullName": null,
            "id": "1",
            "paymentMethods": Array [],
            "profilePicture": null,
            "shortName": "Niq",
            "subscription": Object {
              "active": true,
              "endDate": "2022-05-10T03:57:26.230Z",
              "trialEndDate": "2022-05-10T03:57:26.230Z",
            },
          },
        },
      }
    `)
  })
  it('should execute the @coil/client adaptedPage query', async () => {
    const result = await graphql({
      schema,
      source: adaptedPageQuery,
      contextValue,
      variableValues: {
        url: 'https://localhost',
        channelId: 'xyz'
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "adaptedPage": Object {
            "channelImage": null,
            "paymentPointer": null,
          },
        },
      }
    `)
  })
  it('should execute the @coil/client featureEnabled query', async () => {
    const result = await graphql({
      schema,
      source: featureEnabledQuery,
      contextValue,
      variableValues: {
        key: 'sunshine'
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "featureEnabled": true,
        },
      }
    `)
  })

  it('should execute the @coil/client login mutation', async () => {
    const result = await graphql({
      schema,
      source: loginMutation,
      contextValue,
      variableValues: {
        input: {
          email: 'niq@coil.com',
          password: 'password!'
        }
      }
    })
    expect(result).toMatchObject({
      data: {
        auth: {
          token: jwtMatcher
        }
      }
    })
  })

  it('should execute the @coil/client queryToken query', async () => {
    const result = await graphql({
      schema,
      source: queryTokenQuery,
      contextValue
    })
    const matcher = {
      data: {
        refreshToken: {
          token: jwtMatcher
        },
        whoami: {
          id: '1',
          fullName: null,
          shortName: 'Niq',
          email: 'niq@coil.com',
          profilePicture: null,
          customerId: null,
          canTip: false,
          subscription: {
            active: true,
            endDate: '2022-05-10T03:57:26.230Z',
            trialEndDate: '2022-05-10T03:57:26.230Z'
          },
          currencyPreferences: {
            code: 'USD',
            scale: 1
          },
          paymentMethods: []
        }
      }
    }
    expect(result).toMatchObject(matcher)
  })

  it('should execute the @coil/client refreshBtpToken query', async () => {
    const result = await graphql({
      schema,
      source: refreshBtpTokenQuery,
      contextValue
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "refreshBtpToken": Object {
            "token": "<JWT-TODO>",
          },
        },
      }
    `)
  })

  it('should execute the @coil/client tip mutation', async () => {
    const result = await graphql({
      schema,
      source: tipQuery,
      contextValue,
      variableValues: {
        input: {
          amountCentsUsd: '1000',
          destination: '$uphold.com/user/pp1',
          origin: 'https://legit.site'
        }
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "tip": Object {
            "code": "200",
            "message": "",
            "success": true,
          },
        },
      }
    `)
  })

  it('should execute the @coil/client tipPreview query', async () => {
    const result = await graphql({
      schema,
      source: tipPreviewQuery,
      contextValue,
      variableValues: {
        tipAmountCents: '1001'
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "tipPreview": Object {
            "charges": Object {
              "creditCardCharge": "0",
              "tipCreditCharge": "1001",
            },
            "code": "200",
            "message": "",
            "success": true,
          },
        },
      }
    `)
  })

  it('should execute the @coil/client tipSettings query', async () => {
    const result = await graphql({
      schema,
      source: tipSettingsQuery,
      contextValue
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "extensionNewUiFeatureFlag": true,
          "minTipLimit": Object {
            "minTipLimitAmountCentsUsd": "100",
          },
          "tippingBetaFeatureFlag": true,
          "whoami": Object {
            "tipping": Object {
              "lastTippedAmountCentsUsd": "100",
              "limitRemainingAmountCentsUsd": "1000",
              "totalTipCreditAmountCentsUsd": "10000",
            },
          },
        },
      }
    `)
  })
})
