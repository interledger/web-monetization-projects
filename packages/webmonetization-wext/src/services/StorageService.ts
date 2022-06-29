import { injectable, unmanaged } from '@dier-makr/annotations'

type Value = string | number | boolean | object

export interface StoragePersistence {
  cache: Map<string, Value>

  setItem(key: string, value: Value): void

  removeItem(key: string): void

  clear(): void
}

@injectable()
export class StorageService {
  private get cache(): Map<string, Value> {
    return this.storage.cache
  }

  // noinspection TypeScriptFieldCanBeMadeReadonly
  constructor(
    @unmanaged()
    private storage: StoragePersistence,
    @unmanaged()
    private onChanged?: (key: string) => void
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, value: any) {
    this.storage.setItem(key, value)
    this.notifyChanged(key, value)
    this.cache.set(key, value)
  }

  private notifyChanged(key: string, value: string | null) {
    if (this.onChanged && (!value || value !== this.cache.get(key))) {
      this.onChanged(key)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T extends Value>(key: string): T | null {
    const val = this.cache.get(key)
    if (val === null) {
      return null
    } else {
      return val as T
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
