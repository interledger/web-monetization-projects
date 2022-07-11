import { createHash } from 'crypto'
import * as fs from 'fs'

import { makeWebpackConfig } from '@webexts/build-utils'
import { wmPolyfill } from '@webmonetization/wext/content'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

const polyfill = Buffer.from(wmPolyfill, 'utf-8')
const digest = createHash('sha256').update(polyfill).digest()
const polyfillHash = `sha256-${digest.toString('base64')}`

// write polyfill
// fs.writeFileSync(`${__dirname}/dist/${polyfillHash}.js`, polyfill)

export const config = merge(
  makeWebpackConfig({ rootDir: __dirname, polyfillHash, polyfill: wmPolyfill }),
  {
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_DEFINE_BTP_ENDPOINT: JSON.stringify(
          process.env.BTP_ENDPOINT || null
        )
      })
    ]
  }
)
