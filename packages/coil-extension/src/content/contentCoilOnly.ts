import SuperTokensLock from 'browser-tabs-lock'

const LOCK_KEY = 'REFRESH_TOKEN_USE'

/**
 *
 *
 *
 */
export class LockingService {
  private locks = new Map<number, SuperTokensLock>()

  getOrCreateLock(id: number) {
    let lock: SuperTokensLock | undefined = this.locks.get(id)
    if (!lock) {
      lock = new SuperTokensLock()
      this.locks.set(id, lock)
    }
    return lock
  }

  constructor(
    private api: typeof window.chrome,
    private log: typeof console.log
  ) {}

  async acquireLock(id: number, timeout?: number): Promise<boolean> {
    this.log({ id, timeout })
    return this.getOrCreateLock(id).acquireLock(LOCK_KEY, timeout)
  }

  async releaseLock(id: number): Promise<void> {
    this.log('releaseLock', { id })
    const lock = this.locks.get(id)
    if (lock) {
      return lock.releaseLock(LOCK_KEY)
    } else {
      this.log('warning: no lock found for', { id })
    }
  }
}
