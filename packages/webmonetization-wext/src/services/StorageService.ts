import { injectable, unmanaged } from '@dier-makr/annotations'

export type StoreValue = string | number | boolean | object

export interface StoragePersistence {
  cache: Map<string, StoreValue>

  setItem(key: string, value: StoreValue): void

  removeItem(key: string): void

  clear(): void
}

@injectable()
export class StorageService {
  private get cache(): Map<string, StoreValue> {
    return this.storage.cache
  }

  items() {
    return Object.fromEntries(this.cache.entries())
  }

  keys() {
    return Array.from(this.cache.keys())
  }

  // noinspection TypeScriptFieldCanBeMadeReadonly
  constructor(
    @unmanaged()
    private storage: StoragePersistence,
    @unmanaged()
    private onChanged?: (key: string, value: StoreValue | null) => void
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, value: StoreValue) {
    this.storage.setItem(key, value)
    this.notifyChanged(key, value)
    this.cache.set(key, value)
  }

  private notifyChanged(key: string, value: StoreValue | null) {
    if (this.onChanged && (!value || value !== this.cache.get(key))) {
      this.onChanged(key, value)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(key: string): T | null {
    const val = this.cache.get(key)
    if (val === null) {
      return null
    } else {
      return val as unknown as T
    }
  }

  getBoolean(key: string) {
    return this.get<boolean>(key)
  }

  remove(key: string) {
    this.storage.removeItem(key)
    this.notifyChanged(key, null)
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
    this.storage.clear()
  }

  makeProxy<T>() {
    const handler: ProxyHandler<StorageService> = {
      get: (target, property: string) => {
        return target.get(property)
      },
      set: (target, property: string, value) => {
        target.set(property, value)
        return true
      },
      deleteProperty(target: StorageService, property: string): boolean {
        target.remove(property)
        return true
      }
    }
    return new Proxy(this, handler) as unknown as T
  }
}
