import { injectable } from 'inversify'

interface QueryParams<T> {
  key: string
  maxAgeMs: number
  operationFactory: () => Promise<T>
}

@injectable()
export class CachedOperations {
  cache = new Map<string, { time: number; result: Promise<any> }>()

  async query<T>({ key, maxAgeMs, operationFactory }: QueryParams<T>) {
    let cached = this.cache.get(key)
    if (!cached || Date.now() - cached.time >= maxAgeMs) {
      cached = {
        time: Date.now(),
        result: operationFactory()
      }
      this.cache.set(key, cached)
    }
    const resultForInvokation = cached.result
    try {
      return await cached.result
    } catch (e) {
      if (this.cache.get(key)?.result === resultForInvokation) {
        this.cache.delete(key)
      }
      throw e
    }
  }
}
