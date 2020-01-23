/// <reference types="chrome" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const WEBPACK_DEFINE_API: any
declare const WEBPACK_DEFINE_COIL_DOMAIN: string
declare const WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_ID: string
declare const WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_SECRET: string

// This is to support opening the popup.html page in a normal browser tab
// so that can look at it in various states. An undefined error will be thrown
// if try to assign API directly to the DefinePlugin macro.
let api: null | typeof window.chrome = null
try {
  api = WEBPACK_DEFINE_API
} catch (e) {
  console.warn('WEBPACK_DEFINE_API not set')
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const API: typeof window.chrome = api!
export const COIL_DOMAIN = WEBPACK_DEFINE_COIL_DOMAIN
export const CLOUDFLARE_ACCESS_CLIENT_ID = WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_ID
export const CLOUDFLARE_ACCESS_CLIENT_SECRET = WEBPACK_DEFINE_CLOUDFLARE_ACCESS_CLIENT_SECRET
