export class TimeoutError extends Error {}

export const timeoutRejecting = async (ms: number): Promise<never> => {
  return new Promise<never>((resolve, reject) => {
    setTimeout(() => {
      reject(new TimeoutError())
    }, ms)
  })
}
