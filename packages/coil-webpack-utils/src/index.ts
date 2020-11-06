import * as webpack from 'webpack'

export const configureNodePolyfills = (wpConf: webpack.Configuration) => {
  if (!wpConf.resolve) {
    throw new Error()
  }
  wpConf.resolve.fallback = {
    ...wpConf.resolve.fallback,
    setImmediate: `${__dirname}/../polyfills/setImmediate.js`,
    process: require.resolve('process/browser'),
    string_decoder: require.resolve('string_decoder/'),
    assert: require.resolve('assert/'),
    events: require.resolve('events/'),
    crypto: require.resolve('crypto-browserify/'),
    util: require.resolve('util/'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify/')
  }
  wpConf.plugins = [
    ...(wpConf.plugins ?? []),
    new webpack.ProvidePlugin({
      process: ['process']
    }),
    new webpack.ProvidePlugin({
      setImmediate: ['setImmediate', 'setImmediate'],
      clearImmediate: ['setImmediate', 'clearImmediate']
    }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ]
  return wpConf
}
