// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '14' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
}
