import {
  makeWebpackConfig,
  MakeWebpackConfigParams
} from '@webexts/build-utils'
import { wmPolyfill } from '@webmonetization/wext/content'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

const options: MakeWebpackConfigParams = {
  rootDir: __dirname,
  polyfill: {
    content: wmPolyfill,
    name: 'wm-polyfill',
    patch: (manifest, polyfill) => {
      // language=JavaScript
      const coilExtension = {
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
