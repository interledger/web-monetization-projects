/// <reference types="chrome" />

declare const WEBPACK_DEFINE_API: any
declare const WEBPACK_DEFINE_COIL_DOMAIN: any
declare const WEBPACK_DEFINE_COIL_REDEEMER: any
declare const WEBPACK_DEFINE_COIL_SIGNER: any

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
export const COIL_DOMAIN: string = WEBPACK_DEFINE_COIL_DOMAIN
export const COIL_REDEEMER: string = WEBPACK_DEFINE_COIL_REDEEMER
export const COIL_SIGNER: string = WEBPACK_DEFINE_COIL_SIGNER
