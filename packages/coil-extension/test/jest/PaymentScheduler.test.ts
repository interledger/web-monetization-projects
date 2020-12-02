import '@abraham/reflection'
import { PaymentScheduler } from '../../src/background/services/PaymentScheduler'

const M = 60_000

describe('PaymentScheduler', () => {
  let ps, spy
  let time = Date.now()
  beforeEach(() => {
    jest.useFakeTimers()
    spy = jest.spyOn(Date, 'now').mockImplementation(() => time)
    ps = new PaymentScheduler()
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

    it('batches tokens', () => {
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

    it('handles partial onSent tokens', () => {
      tick(M)
      ps.onSent(0.9)
      expect(ps.hasAvailableFullToken()).toBe(true)
      ps.onSent(0.1)
      expect(ps.hasAvailableFullToken()).toBe(false)
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

/*
  describe('waitTimeWithJitter', () => {
    it('varies by at most JITTER', () => {
      //ps.onSent()
      for (let i = 0; i < 1000; i++) {
        const w = ps.waitTimeWithJitter()
        expect(Math.abs(w - M)).toBeLessThan(5_000)
        expect(w).toBeGreaterThanOrEqual(0)
      }
    })
  })

  describe('waitTime', () => {
    it('spaces absolute token times', () => {
      const waits = []
      for (let i = 0; i < 40; i++) {
        const w = ps.waitTime()
        waits.push(w)
        ps.onSent()
      }
      // This also verifies that "overspending" tokens still results in a
      // correctly-computed delay.
      // prettier-ignore
      expect(waits).toStrictEqual([
         1*M,  2*M,  3*M,  4*M,  5*M,  6*M,  7*M,  8*M,  9*M, 10*M, 10*M,
        12*M, 12*M, 14*M, 14*M, 16*M, 16*M, 18*M, 18*M, 20*M, 20*M, 20*M,
        23*M, 23*M, 23*M, 26*M, 26*M, 26*M, 29*M, 29*M, 29*M, 32*M, 32*M,
        32*M, 32*M, 36*M, 36*M, 36*M, 36*M, 40*M,
      ])
    })

    it('spaces relative token times', () => {
      const waits = []
      for (let i = 0; i < 40; i++) {
        const w = ps.waitTime()
        waits.push(w)
        ps.onSent()
        tick(w)
      }
      // prettier-ignore
      expect(waits).toStrictEqual([
        1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M,
        0*M, 2*M, 0*M, 2*M, 0*M, 2*M, 0*M, 2*M, 0*M, 2*M,
        0*M, 0*M, 3*M, 0*M, 0*M, 3*M, 0*M, 0*M, 3*M, 0*M,
        0*M, 3*M, 0*M, 0*M, 0*M, 4*M, 0*M, 0*M, 0*M, 4*M,
      ])
    })

    it('adjusts the wait time', () => {
      //ps.onSent()
      for (let i = 0; i <= 60; i++) {
        expect(ps.waitTime()).toBe(M - i * 1000)
        tick(1000)
      }
    })

    it('handles long sending delays', () => {
      tick(M * 99) // move into the future, so token sending falls behind
      for (let i = 0; i < 10; i++) {
        expect(ps.waitTime()).toBe(0)
        ps.onSent()
      }
    })
  })

  function tick(ms: number): void {
    time += ms
    jest.advanceTimersByTime(ms)
  }
*/
