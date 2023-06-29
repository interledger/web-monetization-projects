const { TestEnvironment } = require('jest-environment-jsdom')
const crypto = require('node:crypto')

/**
 * Jest creates a new VM context for each test and doesn't add in the node
 * fetch object despite it being available on node 18+ and in the browser.
 * We rectify this here.
 */
class CustomizedTestEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()
    this.global.Uint8Array = globalThis.Uint8Array
    this.global.fetch = globalThis.fetch
    this.global.TextDecoder = globalThis.TextDecoder
    this.global.TextEncoder = globalThis.TextEncoder
    this.global.crypto.subtle = crypto.webcrypto.subtle
  }
}

module.exports = CustomizedTestEnvironment
