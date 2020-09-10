import '@abraham/reflection'
import { PaymentScheduler } from '../../src/background/services/PaymentScheduler'

const M = 60_000
const log = args => {}

describe('PaymentScheduler', () => {
  let ps,
    spy,
    time = Date.now()
  beforeEach(() => {
    jest.useFakeTimers()
    spy = jest.spyOn(Date, 'now').mockImplementation(() => time)
    ps = new PaymentScheduler(log)
    // The first minute's payment is not scheduled using PaymentScheduler.
    ps.onSent()
  })

  afterEach(() => {
    spy.mockRestore()
  })

  describe('waitTimeWithJitter', () => {
    it('varies by at most JITTER', () => {
      ps.onSent()
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
         0*M,  1*M,  2*M,  3*M,  4*M,  5*M,  6*M,  7*M,  8*M,  9*M,  9*M,
        11*M, 11*M, 13*M, 13*M, 15*M, 15*M, 17*M, 17*M, 19*M, 19*M, 19*M,
        22*M, 22*M, 22*M, 25*M, 25*M, 25*M, 28*M, 28*M, 28*M, 31*M, 31*M,
        31*M, 31*M, 35*M, 35*M, 35*M, 35*M, 39*M,
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
        0*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M, 1*M,
        0*M, 2*M, 0*M, 2*M, 0*M, 2*M, 0*M, 2*M, 0*M, 2*M,
        0*M, 0*M, 3*M, 0*M, 0*M, 3*M, 0*M, 0*M, 3*M, 0*M,
        0*M, 3*M, 0*M, 0*M, 0*M, 4*M, 0*M, 0*M, 0*M, 4*M,
      ])
    })

    it('adjusts the wait time', () => {
      ps.onSent()
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
})
