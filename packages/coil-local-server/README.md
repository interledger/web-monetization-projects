# Coil Local Server

This implements the subset of coil.com that the extension requires to function.

Whenever the extension sees a payment pointer on a page, instead of doing a
request to that URL, the extension creates a request to the local server,
sending along the payment pointer.

    e.g. http://localhost/spsp-rewriter/'%24uphold.com%2Fuser'

This will require some modification of the extension, introducing an SPSPService
to support the rewrites and a build time config. It will also require creating
a subclass of @coil/anonymous-tokens#AnonymousTokens where \_verifyProof is a
noop. In other words it wil require a "local server mode" configuration of the
DI container.

### Paths implemented

- /handler.html

  - This is injected into the background page of the extension to retrieve
    the token from localStorage.

- /issuer

  - Restricted by a Bearer token in the Authorization header.
    - as returned by the login mutation
  - Request:
    ```typescript
    export interface IssueRequest {
      bl_sig_request: string
    }
    ```
  - Response:
    ```typescript
    export interface IssueResponse {
      // each is a blinded point
      sigs: string[]
      // DLEQ
      proof: string
      prng: string
      version?: string
    }
    ```

- /redeemer

  - Exchange tokens received from /issuer for btpTokens.
  - Request:

    ```typescript
    export interface RedeemRequest {
      // See createRequestBinding
      // contents: [string, string] = [input_to_hash_to_curve, hash_request_binding]
      // btoa(JSON.stringify({ type: 'Redeem', contents: contents }))
      bl_sig_request: string
    }
    ```

  - Response
    ```typescript
    export interface RedeemResponse {
      // btpToken to connect to /btp endpoint
      token: string
    }
    ```

- /login

  - Supports logging in
  - Logout action embedded on page (unlike the real Coil)

- /gateway

  - This is the subset of the federated api impl by bernie & coil-api (coil services)
  - See [src/graphql/schema.graphql](src/graphql/schema.graphql)
  - ```graphql
    type Query {
      whoami: User
      adaptedPage(videoUrl: String, channelId: String): AdaptedPagePayload
      featureEnabled(key: String!): Boolean
      tipPreview(tipAmountCents: String!): TipResponse!
      refreshToken: Token
      refreshBtpToken(highBandwidth: Boolean): Token
      # https://github.com/coilhq/coil/blob/5d40d9b53de01b14412fc9babbdb131bfd3fac7f/services/bernie/src/schema.graphql#L6
      minTipLimit: MinTipLimitResponse!
    }

    type Mutation {
      login(input: LoginInput!): AuthPayload!
      tip(input: TipInput!): TipResponse!
    }
    ```

- /btp

  - need a btp server
    - https://github.com/interledger-deprecated/ilp-plugin-mini-balances/blob/master/index.js

### Notes

#### @interledger/stream-receiver

- Was created by @kinocaid before he left
- stateless
- says it's designed for OP server usage

### TODO:

- Create graphql schema and stub out the resolvers
- Create frontend with custom webpack config, react 18, react-fast-refresh
  - add proxy support to the server (/gateway etc)
    - how to support websockets for /btp
- Storage
  - just create an interface and use a typescript config file to start with
- Privacy Pass tokens
  - just "pretend", don't REALLY need blinded tokens
  - see https://github.com/coilhq/web-monetization-projects/pull/645
  - can _probably_ just subclass AnonymousTokens in the extension and noop \_verifyProof
