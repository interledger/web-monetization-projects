import { injectable } from 'inversify'

const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export interface StreamControl {
  pause: Function
  resume: Function
}

@injectable()
export class IdleDetection {
  constructor(private document: Document) {}

  watchVisibility({ pause, resume }: StreamControl) {
    const document = this.document
    // Immediately pause the stream if the page loads while hidden
    if (document.visibilityState === 'hidden') {
      pause()
    }

    const listener = () => {
      if (document.visibilityState === 'visible') {
        resume()
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
    let lastMovement = Date.now()
    let handle: any

    handle = setTimeout(idleTimerReached, IDLE_TIMEOUT)

    function idleTimerReached() {
      const now = Date.now()
      const idleTimeLeft = lastMovement + IDLE_TIMEOUT - now

      if (idleTimeLeft > 0) {
        handle = setTimeout(idleTimerReached, idleTimeLeft)
      } else {
        idle = true
        pause()
      }
    }

    const listener = () => {
      lastMovement = Date.now()

      if (idle) {
        idle = false
        handle = setTimeout(idleTimerReached, IDLE_TIMEOUT)
        resume()
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
