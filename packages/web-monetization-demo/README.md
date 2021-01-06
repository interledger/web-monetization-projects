# Web Monetization Demo

A self-contained STREAM server that uses
[ilp-plugin-mini-accounts](https://github.com/interledgerjs/ilp-plugin-mini-accounts) to
expose a BTP endpoint.

This also shows how a "verifier" can proxy SPSP requests to a "receiver" by
adding extra headers to support [receipts](https://github.com/interledger/webmonetization.org/pull/51) (proof of payment).

This package includes a minimal toy verifier for illustrative purposes, but for production use, see:
https://webmonetization.org/docs/receipt-verifier/

### Running the demo servers and client

In 4 different terminals:

```
yarn client:dev
yarn receiver:dev
yarn server:dev
yarn verifier:dev
```

### Configuration

| Component | Env Name                           | Type   | Default                         |
| --------- | ---------------------------------- | ------ | ------------------------------- |
| Client    | PAYMENT_POINTER                    | String | http://localhost:4000/spsp/~niq |
| Client    | VERIFIER_URL                       | String | http://localhost:4001           |
| Receiver  | [BTP_PORT](#configuring-extension) | Number | 3000                            |
| Receiver  | RECEIVER_PORT                      | Number | 4000                            |
| Server    | SERVER_PORT                        | Number | 4002                            |
| Server    | VERIFIER_URL                       | String | http://localhost:4001/verify    |
| Verifier  | VERIFIER_PORT                      | Number | 4001                            |

For an example using a custom receiver and the [public receipt verifier](https://webmonetization.org/docs/receipt-verifier/#use-our-publicly-available-receipt-verifier):

```
PAYMENT_POINTER=\$ilp.uphold.com/example VERIFIER_URL=https://webmonetization.org/api/receipts yarn client:dev
VERIFIER_URL=https://webmonetization.org/api/receipts/verify yarn server:dev
```

### Configuring Extension

To connect to the `receiver`'s STREAM server you must build the extension
to use the local btp endpoint (with the configured [BTP_PORT](#configuration)) rather than Coil:

```shell script
cd packages/coil-extension
export BTP_ENDPOINT=btp+ws://localhost:3000
# build in development mode
yarn dev-chrome-prod
```
