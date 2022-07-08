import { createHash } from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

import { makeWebpackConfig } from '@webexts/build-utils'
import { wmPolyfill } from '@webmonetization/wext/content'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

const data = Buffer.from(wmPolyfill, 'utf-8')
const digest = createHash('sha256').update(data).digest()
const polyfillHash = `sha256-${digest.toString('base64')}`

// write polyfill
fs.writeFileSync(`${__dirname}/dist/${polyfillHash}.js`, data)

export const config = merge(
  makeWebpackConfig({ rootDir: __dirname, polyfillHash }),
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
