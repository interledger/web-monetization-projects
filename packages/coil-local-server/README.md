# Coil Local Server

This implements the subset of coil.com that the extension requires to function

Whenever the extension sees a payment pointer on a page, instead of doing a
request to that URL, the extension creates a request to the local server,
sending along the payment pointer.

    e.g. http://localhost/spsp-rewriter/'%24uphold.com%2Fuser'

This will require some modification of the extension, introducing an SPSPService
to support the rewrites and a build time config.

### Paths implemented

- /handler.html

  This is injected into the background page of the extension to retrieve
  the token from localStorage

- /issuer

  - Restricted by a Bearer token in the Authorization header
  - Request:
    ```typescript
    export interface IssueRequest {
      bl_sig_request: string
    }
    ```
  - Response:
    ```typescript
    export interface IssueResponse {
      sigs: string[]
      proof: string
      prng: string
      version?: string
    }
    ```

- /redeemer

- /gateway
  need a graphql server/resolver

- /btp
  need a btp server
  // https://snyk.io/advisor/npm-package/ilp-plugin-mini-balances
  // https://github.com/interledger-deprecated/ilp-plugin-mini-balances/blob/master/index.js

Ideally this could work completely offline so would need to also provide mock
anonymous token support.
TODO:
make it injectable

Would need an SPSP service.
BuilConfig.connectToMock

Using:
@interledger/stream-receiver
was created by kinocaid before he left
stateless
says it's designed for OP server usage

### TODO:

- Create graphql schema and stub out the resolvers
- Create frontend with custom webpack config, react 18, react-fast-refresh
  - add proxy support to the server (/gateway etc)
- Storage
  - just create an interface and use a typescript config file to start with
- privacypass tokens
  - just "pretend", don't REALLY need blinded tokens
  - see https://github.com/coilhq/web-monetization-projects/pull/645
