const key = process.argv[2] || 'DevDist2'

const crypto = require('crypto')
const aCodePoint = 'a'.codePointAt(0)
const hash = crypto.createHash('sha256')
hash.update(key, 'base64')
const hex = hash.digest('hex').slice(0, 32)
const translated = hex
  .split('')
  .map(c => String.fromCodePoint(parseInt(c, 16) + aCodePoint))
  .join('')

console.log({ key, id: translated })
