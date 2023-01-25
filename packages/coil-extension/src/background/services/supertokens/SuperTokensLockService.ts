import { inject, injectable } from 'inversify'
import type BrowserTabsLock from 'browser-tabs-lock'

import * as tokens from '../../../types/tokens'
import { logger, Logger } from '../utils'

type BrowserTabsLockApi = Pick<BrowserTabsLock, 'acquireLock' | 'releaseLock'>

const REFRESH_TOKEN_USE = 'REFRESH_TOKEN_USE' as const
type UNUSED_KEY = typeof REFRESH_TOKEN_USE

interface Tab {
  id: number
}

interface BackgroundLock {
  // It's always the same key
  key?: 'REFRESH_TOKEN_USE'
  id: number
  state: 'init' | 'locking' | 'locked' | 'releasing' | 'released'
  tab?: number
}

const isLocked = (l: BackgroundLock) =>
  l.state === 'locking' || l.state === 'locked'

function checkLockKey(lockKey: 'REFRESH_TOKEN_USE') {
  if (lockKey !== REFRESH_TOKEN_USE) {
    throw new Error(`expecting lock key of ${REFRESH_TOKEN_USE}`)
  }
}

@injectable()
export class SuperTokensLockService {
  tabStack: Tab[] = []
  locks: BackgroundLock[] = []

  constructor(
    @inject(tokens.WextApi)
    private api: typeof window.chrome,
    @logger('SuperTokensLockService')
    private log: Logger
  ) {}

  getTab(id: number) {
    return this.tabStack.find(t => t.id === id)
  }

  async removeTab(tabId: number) {}

  async registerTab(tabId: number) {
    const first = this.haveNoCoilTab()
    this.tabStack.push({
      id: tabId
    })
    if (first) {
      if (this.locked) {
        // there is currently a refresh operation happening in the background
        // we need to lock this tab on the content script side
        // the lock will also be active for all tabs in the future
      }
    }
  }

  private haveCoilTab() {
    return this.tabStack.length !== 0
  }

  private haveNoCoilTab() {
    return !this.haveCoilTab()
  }

  get locked() {
    return this.locks.find(isLocked)
  }

  lockIds = 0

  async getLock(): Promise<BrowserTabsLockApi> {
    let locks = 0
    let acquiredTime: number
    const lock: BackgroundLock = { id: this.lockIds++, state: 'init' }
    this.log('BackgroundLock init')
    this.locks.push(lock)

    return {
      // how long is the lock acquired for?
      // in practice, around a second, 1020ms
      // stale locks (e.g. tab closed before lock released) are cleaned up
      //  after 5 seconds

      /**
       * @param lockKey - parameter is unused here, it's always the same key
       *                  throw error if key is differs to that used at time
       *                  of writing.
       *                  always: 'REFRESH_TOKEN_USE'
       * @param timeout - max time for which function will wait to acquire the
       *                  lock. Unit is in milliseconds
       */
      acquireLock: async (
        lockKey: UNUSED_KEY,
        timeout?: number
      ): Promise<boolean> => {
        checkLockKey(lockKey)
        // TODO: does there need to be a global lock here as well?
        // see: SuperTokens ProcessLock
        // one lock can be acquired

        acquiredTime = Date.now()
        if (this.haveCoilTab()) {
          // how can we acquire the lock?
          // we need to send a message over to one of the tabs to acquire a lock
          //
          // What if we have just one coil tab open and we need to open
        }
        locks++
        if (locks > 1) {
          this.log('more than one lock open at a time', locks)
        }
        return true
      },
      // TODO: we need to do some cleanup here
      releaseLock: async (lockKey: UNUSED_KEY): Promise<void> => {
        checkLockKey(lockKey)

        if (typeof acquiredTime !== 'undefined') {
          this.log('release lock after ms=', Date.now() - acquiredTime)
        }
        locks--
        // we need to check if there's an associated tab
        // if so, send a message to that tab to release the lock
      }
    }
  }
}
