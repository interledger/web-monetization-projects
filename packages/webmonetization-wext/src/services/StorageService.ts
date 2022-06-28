import { injectable, unmanaged } from '@dier-makr/annotations'

export type SyncStorage = Pick<
  Storage,
  'getItem' | 'setItem' | 'removeItem' | 'clear'
>

@injectable()
export class StorageService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: Map<string, string>
  // noinspection TypeScriptFieldCanBeMadeReadonly
  constructor(
    @unmanaged()
    private storage: SyncStorage,
    @unmanaged()
    private onChanged?: (key: string) => void
  ) {
    this.cache = new Map()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, value: any) {
    const encoded = JSON.stringify(value)
    this.storage.setItem(key, encoded)
    this.notifyChanged(key, value)
    this.cache.set(key, value)
  }

  private notifyChanged(key: string, value: string | null) {
    if (this.onChanged && (!value || value !== this.cache.get(key))) {
      this.onChanged(key)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(key: string): T | null {
    const val = this.storage.getItem(key)
    if (val === null) {
      return null
    } else {
      return JSON.parse(val) as T
    }
  }

  getRaw(key: string) {
    return this.storage.getItem(key)
  }

  setRaw(key: string, value: string) {
    this.storage.setItem(key, value)
    this.notifyChanged(key, value)
    this.cache.set(key, value)
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

  makeProxy<T>(rawKeysList: string[] = []) {
    const rawKeys = new Set(rawKeysList)
    const handler: ProxyHandler<StorageService> = {
      get: (target, property: string) => {
        return rawKeys.has(property)
          ? target.getRaw(property)
          : target.get(property)
      },
      set: (target, property: string, value) => {
        if (rawKeys.has(property)) {
          target.setRaw(property, value)
        } else {
          target.set(property, value)
        }
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
