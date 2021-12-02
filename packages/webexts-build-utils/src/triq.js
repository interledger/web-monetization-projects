const stripIt = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });`

module.exports = function (source) {
  // console.log('num args', arguments.length)
  // console.log('Hello from triq', source.toString())
  // console.log(Object.keys(this), typeof source)
  console.log('data', this.request)
  // const data = this.request.endsWith('polyfillMinimalTs.ts')
  const replace = source.replace(stripIt, '')
  console.log('replaced', replace)
  return replace
}
