// The duration "paid" per token.
const TOKEN_DURATION = 60_000 // milliseconds
// For additional privacy, obfuscate token schedules by varying delays by ±jitter (uniform distribution).
const JITTER = 3_000 // milliseconds
const BATCH_RATIO = 0.1
const MAX_BATCH_SIZE = 5 // tokens
const PREPAY_RATIO = 0.1
const MAX_PREPAY_SIZE = MAX_BATCH_SIZE // tokens

export enum ScheduleMode { PrePay, PostPay }

export class PaymentScheduler {
  private sentTokens: number = 0 // tokens sent so far (potentially fractional)
  private nextBatchInt: number = 1 // tokens; the batched high water-mark (always integer). send while nextBatch≤sendMax
  private watch: Stopwatch = new Stopwatch() // accumulate pay time
  constructor(private mode: ScheduleMode) {}

  onSent(tokenPart: number): void { // tokenPart is a fractional token
    this.sentTokens += tokenPart
    console.log("onSent", "tokenPart:", tokenPart)
    while (this.nextBatch() <= this.sentTokens) {
      const batchSize = Math.min(MAX_BATCH_SIZE, 1 + Math.floor(this.nextBatchInt * BATCH_RATIO))
      this.nextBatchInt += batchSize
    }
  }

  hasPaidAny(): boolean {
    return 0 < this.sentTokens
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
    console.log("hasAvailableFullToken", "nextBatch:", this.nextBatch(), "sendMax:", sendMax, "unroundedSendMax:", this.watch.totalTime / TOKEN_DURATION, "sentTokens=", this.sentTokens)
    return 0 < sendMax && this.nextBatch() <= sendMax
      //&& this.sentTokens < this.nextBatch // XXX
      //&& 1 <= maybeRound(this.nextBatch() - this.sentTokens)
  }

  private sendMax(): number { // returns fractional tokens
    const trueSendMax = this.watch.totalTime / TOKEN_DURATION
    switch (this.mode) {
    case ScheduleMode.PrePay:
      return trueSendMax + Math.min(1 + trueSendMax * PREPAY_RATIO, MAX_PREPAY_SIZE)
    case ScheduleMode.PostPay:
      return trueSendMax
    }
  }

  unpaidTokens(): number { // returns fractional tokens
    return this.sendMax() - this.sentTokens
  }

  // Offset nextBatchInt by any fractional tokens, since the nextBatch is used to send whole tokens (a.x-b.x=a-b).
  private nextBatch(): number { // returns fractional tokens
    return this.nextBatchInt + (this.sentTokens - Math.trunc(this.sentTokens))
  }
}

// Fix errors like 1.9 - 0.9 = 0.999…
//function maybeRound(v: number): number {
//  const i = Math.round(v)
//  return Math.abs(i - v) < 0.001 ? i : v
//}

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
