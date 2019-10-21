import { timeout } from './asyncUtils'

export class BackoffWaiter {
  constructor(
    private defaultBackoff = 50,
    private backoff = defaultBackoff,
    private maxBackoff = 5000
  ) {}

  reset() {
    this.backoff = this.defaultBackoff
  }

  async waitAndBackoff(): Promise<void> {
    await timeout(this.backoff)
    this.backoff = Math.floor(this.backoff ** 1.05)
    if (this.backoff > this.maxBackoff) {
      this.backoff = this.maxBackoff
    }
  }
}
