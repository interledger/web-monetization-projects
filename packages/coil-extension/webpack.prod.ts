import * as webpack from 'webpack'
import merge from 'webpack-merge'

import { config } from './webpack.common'

const coilProd = 'https://coil.com'
const localServer = 'http://localhost:4000'
module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_COIL_DOMAIN: JSON.stringify(
        process.env.USE_LOCAL_SERVER ? localServer : coilProd
      )
    })
  ]
})
