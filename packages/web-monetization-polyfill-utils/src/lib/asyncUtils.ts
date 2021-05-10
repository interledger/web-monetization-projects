export const timeout = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const onlyOnce = (block: () => void) => {
  let ran = false
  return () => {
    if (!ran) {
      ran = true
      block()
    }
  }
}
