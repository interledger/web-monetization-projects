import { makeWebpackConfig } from '@webexts/build-utils'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

export const config = merge(makeWebpackConfig(__dirname), {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_BTP_ENDPOINT: JSON.stringify(
        process.env.BTP_ENDPOINT || null
      )
    })
  ]
})
