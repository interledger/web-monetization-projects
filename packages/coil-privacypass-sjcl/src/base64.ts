export const binToAscii: (s: string) => string = (s: string) =>
  Buffer.from(s, 'binary').toString('base64')
export const asciiToBin: (s: string) => string = (s: string) =>
  Buffer.from(s, 'base64').toString('binary')
