export async function timeout<T>(
  operation: string,
  ms: number,
  p: Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`${operation} timed out (timeout=${ms}ms)`))
    }, ms)
    p.then(resolve)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function listenOnce(type: string, target: EventTarget) {
  return new Promise(resolve => {
    target.addEventListener(type, resolve, { once: true })
  })
}
