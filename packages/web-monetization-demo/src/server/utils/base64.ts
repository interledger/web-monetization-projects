export function b64urlEncode(unencoded: Buffer) {
  const encoded = unencoded.toString('base64')
  return encoded
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

export function b64urlDecode(encoded: string) {
  encoded = encoded.replace('-', '+').replace('_', '/')
  while (encoded.length % 4) encoded += '='
  return Buffer.from(encoded, 'base64')
}
