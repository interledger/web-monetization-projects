import * as webpack from 'webpack'
import merge from 'webpack-merge'

import { config } from './webpack.common'

const CLOUDFLARE_ACCESS_CLIENT_ID = process.env.CLOUDFLARE_ACCESS_CLIENT_ID || ''
const CLOUDFLARE_ACCESS_CLIENT_SECRET = process.env.CLOUDFLARE_ACCESS_CLIENT_SECRET || ''

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_COIL_DOMAIN: JSON.stringify('https://staging.coil.com'),
      WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_ID: JSON.stringify(CLOUDFLARE_ACCESS_CLIENT_ID),
      WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_SECRET: JSON.stringify(CLOUDFLARE_ACCESS_CLIENT_SECRET)
    })
  ]
})
