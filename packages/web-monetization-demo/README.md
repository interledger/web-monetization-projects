# Web Monetization Demo

A self-contained STREAM server that uses
[ilp-plugin-mini-accounts](https://github.com/interledgerjs/ilp-plugin-mini-accounts) to
expose a BTP endpoint.

This also shows how a "verifier" can proxy SPSP requests to a "receiver" by
adding extra headers to support [receipts](https://github.com/interledger/webmonetization.org/pull/51) (proof of payment).

For a production ready Receipt Verifier (using redis/lua), see [here](https://github.com/coilhq/receipt-verifier)

### Running the demo servers and client

In 3 different terminals:

```
yarn client:dev
yarn receiver:dev
yarn verifier:dev
```

### Configuring Extension

To connect to the STREAM server you must build the extension
to use the local btp endpoint rather than Coil:

```shell script
cd packages/coil-extension
export BTP_ENDPOINT=btp+ws://localhost:3000
# build in development mode
yarn dev-chrome-prod
```
