/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  name: 'check-node-version',
  factory: require => {
    const version = process.version.replace(/[^0-9.]/g, '')
    const major = Number(version.split('.')[0])
    const minimum = 18
    if (major < minimum && !process.env.VERCEL) {
      throw new Error(
        `node version ${process.version} < minimum node version: v${minimum}`
      )
    }
    return {}
  }
}
