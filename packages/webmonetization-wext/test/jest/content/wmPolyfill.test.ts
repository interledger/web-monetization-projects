import { createHash } from 'crypto'

// noinspection ES6PreferShortImport
import { wmPolyfill } from '../../../src/content/wmPolyfill'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toMatchInlineSnapshot(
      `"sha256-cwCy97bimEtwiCcIdyU6vkPo1Ll1qwP/t40jpbYnNr0="`
    )
  })
  it('should not support relList without polyfill', () => {
    const link = document.createElement('link')
    const supportMonetization = link.relList.supports('monetization')
    expect(supportMonetization).not.toBe(true)
  })
})

declare global {
  interface MonetizationEvent extends Event {
    type: 'monetization'
  }

  interface HTMLLinkElement {
    onmonetization: ((evt: MonetizationEvent) => void) | null
  }
  interface Window {
    onmonetization: ((evt: MonetizationEvent) => void) | null
    MonetizationEvent: new (...args: unknown[]) => MonetizationEvent
  }
}

describe('wmPolyfill jsdom', () => {
  beforeAll(() => {
    const script = document.createElement('script')
    script.type = 'application/javascript'
    script.innerHTML = wmPolyfill
    document.head.appendChild(script)
  })
  it('should support link.relList.supports("monetization")', () => {
    const link = document.createElement('link')
    expect(link.relList.supports('monetization')).toBe(true)
  })
  test('HTMLElement.onmonetization should be null when not set', () => {
    const link = document.createElement('link')
    expect(link.onmonetization).toBeNull()
  })
  test('Window.onmonetization should be null when not set', () => {
    expect(window.onmonetization).toBeNull()
  })
  test('HTMLElement.onmonetization should return what was set', () => {
    const link = document.createElement('link')
    const cb = (link.onmonetization = () => null)
    expect(link.onmonetization).toBe(cb)
  })
  test('Window.onmonetization should return what was set', () => {
    const cb = (window.onmonetization = () => null)
    expect(window.onmonetization).toBe(cb)
  })

  test('window.MonetizationEvent should be set', () => {
    expect(window.MonetizationEvent).not.toBeUndefined()
  })

  test('window.onmonetization should remove handler when set to null', () => {
    expect.assertions(0)
    window.onmonetization = event => {
      expect(event).toBeDefined()
    }
    window.onmonetization = null
    const event = new window.MonetizationEvent('monetization', {})
    window.dispatchEvent(event)
  })
  test(
    'window.onmonetization handler should be invoked ' +
      'when monetization event dispatched',
    () => {
      expect.assertions(1)
      window.onmonetization = event => {
        expect(event).toBeDefined()
      }
      const event = new window.MonetizationEvent('monetization', {})
      window.dispatchEvent(event)
    }
  )
})
