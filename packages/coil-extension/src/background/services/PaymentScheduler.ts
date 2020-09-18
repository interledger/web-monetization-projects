import { injectable } from 'inversify'
import { Logger, logger } from './utils'

// The duration "paid" per token.
const TOKEN_DURATION = 60_000 // milliseconds
// For additional privacy, obfuscate token schedules by varying delays by ±jitter (uniform distribution).
const JITTER = 5_000 // milliseconds
// Except for the first token, full payment for interval [T₀,T₁] is sent at time T₀.
// The interval is `tokensPerBatch * TOKEN_DURATION` milliseconds.
// `tokensPerBatch` is the maximum of:
// - `TOKEN_DURATION` (1 minute).
// - `1+floor(sent*PREPAY)`
//
// For example, when `PREPAY==0.1`, after 10 minutes it will pay 2 tokens at a time.
// After 20 minutes, it will pay 3 tokens at a time.
const PREPAY = 0.1

@injectable()
export class PaymentScheduler {
  private sent = 0 // tokens sent
  private startT = Date.now()
  private stopT = 0
  // time relative to start. Initially set in the future since the first (scheduled) token isn't until `startT+1m`.
  private relT = TOKEN_DURATION
  private batchSize = 1 // tokens per batch
  private batchIndex = 0 // index within batch
  private timer?: NodeJS.Timer
  private onClose?: (err: Error) => void

  constructor(@logger('PaymentScheduler') private readonly debug: Logger) {}

  onSent(): void {
    this.sent++
    if (++this.batchIndex === this.batchSize) {
      this.batchIndex = 0
      this.batchSize = 1 + Math.floor(this.sent * PREPAY)
      this.relT += TOKEN_DURATION * this.batchSize
    }
  }

  async wait(): Promise<void> {
    // Don't pay when paused.
    if (this.stopT) {
      this.startT += Date.now() - this.stopT
      this.stopT = 0
    }

    const ms = this.waitTimeWithJitter()
    this.debug(
      'waiting until %s (%dms) before sending payment number %d',
      new Date(Date.now() + ms),
      ms,
      this.sent + 1
    )
    if (!ms) return
    await new Promise((resolve, reject): void => {
      this.timer = setTimeout(resolve, ms)
      this.onClose = reject
    })
  }

  stop(): void {
    this.stopT = Date.now()
    if (this.timer) clearTimeout(this.timer)
    if (this.onClose) this.onClose(new Error('closed'))
  }

  private waitTimeWithJitter(): number {
    const w = this.waitTime()
    const j = randBetween(-JITTER, JITTER)
    return w === 0 ? w : Math.max(0, w + j)
  }

  private waitTime(): number {
    const relSendTime = this.relT - TOKEN_DURATION * this.batchSize
    const absSendTime = this.startT + relSendTime
    return Math.max(0, absSendTime - Date.now())
  }
}

function randBetween(a: number, b: number): number {
  return Math.random() * (b - a) + a
}
