const { readFileSync } = require('fs')

const lines = readFileSync(`${__dirname}/tsconfig.json`)
  .toString()
  .split('\n')
const noComments = lines.filter(line => !line.trim().startsWith('//'))
const tsconfig = JSON.parse(noComments.join('\n'))
const paths = tsconfig.compilerOptions.paths
const pathsNormalized = Object.keys(tsconfig.compilerOptions.paths).map(p => [
  p,
  paths[p][0]
])

module.exports = pathsNormalized.reduce((accum, [key, val]) => {
  accum[key] = `${__dirname}/${val}`
  return accum
}, {})
