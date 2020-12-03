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

For an example using the [public receipt verifier](https://webmonetization.org/docs/receipt-verifier/#use-our-publicly-available-receipt-verifier):

```
VERIFIER_URL=https://webmonetization.org/api/receipts yarn client:dev
yarn receiver:dev
VERIFIER_URL=https://webmonetization.org/api/receipts/verify yarn server:dev
```

For an example using a custom receiver:

```
PAYMENT_POINTER=$ilp.uphold.com/example yarn client:dev
yarn server:dev
yarn verifier:dev
```

### Configuring Extension

To connect to the `receiver`'s STREAM server you must build the extension
to use the local btp endpoint rather than Coil:

```shell script
cd packages/coil-extension
export BTP_ENDPOINT=btp+ws://localhost:3000
# build in development mode
yarn dev-chrome-prod
```
