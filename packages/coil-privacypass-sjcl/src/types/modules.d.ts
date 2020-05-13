/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'keccak' {
  const func: (name: string) => any
  export = func
}

declare module 'asn1-parser' {
  const ASN1: any
  const PEM: any
}
