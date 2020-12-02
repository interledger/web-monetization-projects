// The duration "paid" per token.
const TOKEN_DURATION = 60_000 // milliseconds
// For additional privacy, obfuscate token schedules by varying delays by ±jitter (uniform distribution).
const JITTER = 3_000 // milliseconds
const BATCH_RATIO = 0.1
const MAX_BATCH_SIZE = 5 // tokens

export class PaymentScheduler {
  private sentTokens: number = 0 // tokens
  private batchedSendMax: number = 1 // tokens
  private watch: Stopwatch = new Stopwatch() // accumulate pay time

  onSent(tokenPart: number): void { // tokenPart is a fractional token
    this.sentTokens += tokenPart
    console.log("onSent", "tokenPart:", tokenPart)
    while (this.batchedSendMax <= this.sentTokens) {
      const batchSize = Math.min(MAX_BATCH_SIZE, 1 + Math.floor(this.batchedSendMax * BATCH_RATIO))
      this.batchedSendMax += batchSize
    }
  }

  stop(): void {
    this.watch.stop()
  }

  // Wait for the next full token.
  // Returns false when stopped before a full token is available.
  async awaitFullToken(): Promise<boolean> {
    const start = Date.now()
    this.watch.tick()
    while (!this.hasAvailableFullToken()) {
      const waited = await this.watch.wait(5_000 + randBetween(-JITTER, JITTER))
      if (!waited) return false
      this.watch.tick()
    }
    console.log("WAIT_DONE", "waited:", Date.now()-start, "unpaid:", this.unpaidTokens(), "sent:", this.sentTokens)
    return true
  }

  private hasAvailableFullToken(): boolean {
    const sendMax = Math.floor(this.sendMax())
    console.log("hasAvailableFullToken", "batchedSendMax:", this.batchedSendMax, "sendMax:", sendMax, "unrounded:", this.watch.totalTime / TOKEN_DURATION)
    return 0 < sendMax && this.batchedSendMax <= sendMax
      && this.sentTokens < this.batchedSendMax
  }

  private sendMax(): number { // returns fractional tokens
    return this.watch.totalTime / TOKEN_DURATION
  }

  hasPaidAny(): boolean {
    return 1 <= this.sentTokens
  }

  unpaidTokens(): number { // returns fractional tokens
    const unpaidTime = this.watch.totalTime - this.sentTokens * TOKEN_DURATION
    return unpaidTime / TOKEN_DURATION
  }
}

function randBetween(a: number, b: number): number {
  return Math.random() * (b - a) + a
}

class Stopwatch {
  public totalTime: number = 0 // milliseconds duration
  private lastTick?: number = Date.now() // milliseconds time
  private timer?: NodeJS.Timer
  private cancelTimer?: () => void

  wait(delay: number): Promise<boolean> {
    return new Promise((resolve) => {
      this.timer = setTimeout(() => resolve(true), delay)
      this.cancelTimer = () => resolve(false)
    })
  }

  stop(): void {
    this.tick()
    if (this.timer) clearTimeout(this.timer)
    if (this.cancelTimer) this.cancelTimer()
    this.lastTick = this.timer = this.cancelTimer = undefined
  }

  isStopped(): boolean { return !!this.lastTick }

  tick(): void {
    const now = Date.now()
    this.totalTime += now - (this.lastTick || now)
    this.lastTick = now
  }
}
