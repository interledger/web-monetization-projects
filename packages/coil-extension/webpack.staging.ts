import * as webpack from 'webpack'
import merge from 'webpack-merge'

import { config } from './webpack.common'

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_COIL_DOMAIN: JSON.stringify('https://staging.coil.com'),
      // TODO use the real staging domains (not localhost)
      //WEBPACK_DEFINE_COIL_REDEEMER: JSON.stringify('https://redeemer.staging.coil.com'),
      //WEBPACK_DEFINE_COIL_SIGNER: JSON.stringify('https://signer.staging.coil.com')
      WEBPACK_DEFINE_COIL_REDEEMER: JSON.stringify('http://localhost:8081'),
      WEBPACK_DEFINE_COIL_SIGNER: JSON.stringify('http://localhost:8080')
    })
  ]
})
