import * as path from 'path'

import {
  makeWebpackConfig,
  MakeWebpackConfigParams
} from '@webexts/build-utils'
import { wmPolyfill } from '@webmonetization/wext/content'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

const options: MakeWebpackConfigParams = {
  rootDir: path.resolve(__dirname, '..'),
  polyfill: {
    content: wmPolyfill,
    name: 'wm-polyfill',
    patch: (manifest, polyfill, packageVersion, buildConfig) => {
      // language=JavaScript
      const coilExtension = {
        manifest,
        packageVersion,
        buildConfig,
        version: manifest.version,
        name: manifest.name
      }
      polyfill.content += `
        window.coilExtension = ${JSON.stringify(coilExtension)}
`
      return polyfill
    }
  }
}

export const config = merge(makeWebpackConfig(options), {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_BTP_ENDPOINT: JSON.stringify(
        process.env.BTP_ENDPOINT || null
      )
    })
  ]
})
