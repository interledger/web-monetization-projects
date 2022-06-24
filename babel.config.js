const nodeMajorVersion = Number(process.versions.node.split('.')[0])

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { loose: false, targets: { node: nodeMajorVersion } }
    ],
    ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
    ['@babel/preset-react', {}]
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true, decoratorsBeforeExport: undefined }
    ],
    'babel-plugin-parameter-decorator',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
