import { createHash } from 'crypto'

// noinspection ES6PreferShortImport
import { wmPolyfill } from '../../../src/content/wmPolyfill'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toMatchInlineSnapshot(
      `"sha256-TUVS2Vmz6XveNSnDETz6YxN8dP4aLATtzq28oOhHgl0="`
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
    onmonetization: (evt: MonetizationEvent) => void
  }
  interface Window {
    onmonetization: (evt: MonetizationEvent) => void
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
  it('HTMLElement.onmonetization should be null when not set', () => {
    const link = document.createElement('link')
    expect(link.onmonetization).toBeNull()
  })
  it('Window.onmonetization should be null when not set', () => {
    expect(window.onmonetization).toBeNull()
  })
  it('HTMLElement.onmonetization should return what was set', () => {
    const link = document.createElement('link')
    const cb = (link.onmonetization = () => null)
    expect(link.onmonetization).toBe(cb)
  })
  it('Window.onmonetization should return what was set', () => {
    const cb = (window.onmonetization = () => null)
    expect(window.onmonetization).toBe(cb)
  })
})
