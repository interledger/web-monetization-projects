import * as webpack from 'webpack'
import merge from 'webpack-merge'

import { config } from './webpack.common'

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_COIL_DOMAIN: JSON.stringify('http://localhost:3000'),
      WEBPACK_DEFINE_COIL_REDEEMER: JSON.stringify('http://localhost:8081'),
      WEBPACK_DEFINE_COIL_SIGNER: JSON.stringify('http://localhost:8080')
    })
  ]
})
