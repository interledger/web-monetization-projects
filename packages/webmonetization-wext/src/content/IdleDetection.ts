import { inject, injectable } from '@dier-makr/annotations'

export const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export interface StreamControl {
  pause: Function
  resume: Function
}

export type IdleDetectionDocument = Pick<
  Document,
  'removeEventListener' | 'addEventListener' | 'visibilityState'
>

@injectable()
export class IdleDetection {
  constructor(private document: Document) {}

  getNow() {
    return Date.now()
  }

  watchVisibility({ pause, resume }: StreamControl) {
    const document = this.document
    // Immediately pause the stream if the page loads while hidden
    if (document.visibilityState === 'hidden') {
      pause("visibilityState === 'hidden'")
    }

    const listener = () => {
      if (document.visibilityState === 'visible') {
        resume("document.visibilityState === 'visible'")
      } else {
        pause()
      }
    }
    document.addEventListener('visibilitychange', listener)
    return () => {
      document.removeEventListener('visibilitychange', listener)
    }
  }

  watchMouseMovement({ pause, resume }: StreamControl) {
    const document = this.document
    let idle = false
    let lastMovement = this.getNow()
    let handle: number

    const idleTimerReached = () => {
      const now = this.getNow()
      const idleTimeLeft = lastMovement + IDLE_TIMEOUT - now

      if (idleTimeLeft > 0) {
        handle = window.setTimeout(idleTimerReached, idleTimeLeft)
      } else {
        idle = true
        pause()
      }
    }

    handle = window.setTimeout(idleTimerReached, IDLE_TIMEOUT)

    const listener = () => {
      lastMovement = this.getNow()

      if (idle) {
        idle = false
        handle = window.setTimeout(idleTimerReached, IDLE_TIMEOUT)
        resume('mousemove idle')
      }
    }

    document.addEventListener('mousemove', listener)

    return () => {
      clearTimeout(handle)
      document.removeEventListener('mousemove', listener)
    }
  }

  watchPageEvents() {
    const cleanups: Function[] = []
    return {
      clearWatch: () => {
        while (typeof cleanups[0] === 'function') {
          cleanups[0]()
          cleanups.pop()
        }
      },
      setWatch: (stream: StreamControl) => {
        cleanups.push(this.watchVisibility(stream))
        cleanups.push(this.watchMouseMovement(stream))
      }
    }
  }

  isBackgrounded() {
    return this.document.visibilityState === 'hidden'
  }
}
