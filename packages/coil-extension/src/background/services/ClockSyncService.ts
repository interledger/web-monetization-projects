import { injectable } from 'inversify'

const NUM_ERRORS = 3
const ERRORS_IN_MS = NUM_ERRORS * 3000

@injectable()
export class ClockSyncService {
  private expiredErrors: number[] = []

  onStreamError(error: Error) {
    const errors = this.expiredErrors

    if (error.message.search(/IL-DCP request packet is expired/)) {
      const now = Date.now()
      errors.push(now)
      while (errors[0] + ERRORS_IN_MS < now) {
        errors.shift()
      }
    }

    return errors.length >= NUM_ERRORS
  }
}
