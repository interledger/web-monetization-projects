export function resolvePointer(pointer: string): string {
  if (!pointer.startsWith('$')) {
    return pointer
  }
  const url = new URL(`https://${pointer.substring(1)}`)
  if (url.pathname === '/') {
    url.pathname = '/.well-known/pay'
  }
  return url.href
}
