// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 16 } }],
    ['@babel/preset-typescript', { onlyRemoveTypeImports: true }]
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true, decoratorsBeforeExport: undefined }
    ],
    'babel-plugin-parameter-decorator',
    ['@babel/plugin-proposal-class-properties', {}],
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
