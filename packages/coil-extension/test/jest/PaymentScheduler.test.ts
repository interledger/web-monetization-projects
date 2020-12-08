import { PaymentScheduler, ScheduleMode } from '../../src/background/services/PaymentScheduler'

const M = 60_000

describe('PaymentScheduler', () => {
  let ps, spy
  let time = Date.now()
  beforeEach(() => {
    jest.useFakeTimers()
    spy = jest.spyOn(Date, 'now').mockImplementation(() => time)
    ps = new PaymentScheduler(ScheduleMode.PostPay)
  })

  function tick(ms: number): void {
    time += ms
    jest.advanceTimersByTime(ms)
    ps.watch.tick()
  }

  afterEach(() => {
    spy.mockRestore()
  })

  describe('hasAvailableFullToken', () => {
    it('signals the first token after 1 minute', () => {
      tick(M - 1)
      expect(ps.hasAvailableFullToken()).toBe(false)
      tick(2)
      expect(ps.hasAvailableFullToken()).toBe(true)
    })

    it('PostPay: batches tokens', () => {
      const expectCounts = [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0,
        0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3,
        0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0,
        0, 5,
      ]
      const counts = []
      for (let i = 0; i < expectCounts.length; i++) {
        let j = 0
        while (ps.hasAvailableFullToken()) { j++; ps.onSent(1) }
        counts.push(j)
        tick(M)
      }
      expect(counts).toStrictEqual(expectCounts)
    })

    it('PrePay: batches tokens', () => {
      ps = new PaymentScheduler(ScheduleMode.PrePay)
      const expectCounts = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 0, 2, 0, 2, 0, 2, 0, 2, 0,
        3, 0, 0, 3, 0, 0, 3, 0, 0, 3,
        0, 0, 4, 0, 0, 0, 4, 0, 0, 0,
        5, 0, 0, 0, 0, 5,
      ]
      const counts = []
      for (let i = 0; i < expectCounts.length; i++) {
        let j = 0
        while (ps.hasAvailableFullToken()) { j++; ps.onSent(1) }
        counts.push(j)
        tick(M)
      }
      expect(counts).toStrictEqual(expectCounts)
    })

    it('handles partial onSent tokens, with minute ticks', () => {
      tick(M)
      ps.onSent(0.9) // Pay a partial token.
      expect(ps.hasAvailableFullToken()).toBe(false) // Only 0.1 tokens available.
      tick(M) // Now 1.1 tokens available.
      expect(ps.hasAvailableFullToken()).toBe(true)
      ps.onSent(1.0) // Back to 0.1 tokens available.
      expect(ps.hasAvailableFullToken()).toBe(false)
    })

    it('handles partial onSent tokens, with sub-minute ticks', () => {
      tick(M)
      ps.onSent(0.9) // pay a partial token
      tick(M * 0.91) // time=1.91
      expect(ps.hasAvailableFullToken()).toBe(true)
    })
  })

  describe('unpaidTokens', () => {
    it('returns fractional tokens', () => {
      expect(ps.unpaidTokens()).toBe(0.0)
      tick(M / 10)
      expect(ps.unpaidTokens()).toBe(0.1)
      tick(M / 10)
      expect(ps.unpaidTokens()).toBe(0.2)
      tick(M)
      expect(ps.unpaidTokens()).toBe(1.2)
    })

    it('decreases after onSent', () => {
      tick(M / 10)
      expect(ps.unpaidTokens()).toBe(0.1)
      ps.onSent(0.03)
      expect(ps.unpaidTokens()).toBe(0.07)
    })
  })
})
