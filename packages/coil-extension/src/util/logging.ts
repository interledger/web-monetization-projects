import debugFactory from 'debug'

export function makeLogger(namespace?: string) {
  return debugFactory(
    namespace ? `coil-extension:${namespace}` : 'coil-extension'
  )
}
