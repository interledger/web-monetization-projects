import merge from 'webpack-merge'
import { makeWebpackConfig } from '@webexts/build-utils'

module.exports = merge(makeWebpackConfig({ rootDir: __dirname }), {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader:
      //     'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file-loader?name=fonts/[name].[ext]'
      // },
      // {
      //   test: /\.(jpe?g|png|gif)$/,
      //   loader: 'file-loader?name=img/[name].[ext]'
      // }
    ]
  },
  plugins: []
})
