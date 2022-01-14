const createBindingCode = (...events: string[]) => {
  return events
    .map(
      e =>
        `document.monetization.addEventListener('${e}', ` +
        `(e) => console.log(
           '%c Web-Monetization %s event:  %s',
           'color: aqua; background-color: black',
           e.type,
           JSON.stringify(e.detail)) )
          `
    )
    .join(';')
}

const basicEventsLoggingCode = createBindingCode(
  'monetizationstart',
  'monetizationstop',
  'monetizationpending'
)

// This can be quite noisy so only enable when localStorage.WM_DEBUG_PROGRESS
// is set.
const progressLoggingCode = createBindingCode('monetizationprogress')

// language=JavaScript
export const wmPolyFillMinimal = `
  class Monetization extends EventTarget {
    state = 'stopped'

    get [Symbol.toStringTag]() {
      return 'Monetization'
    }
  }

  document.monetization = new Monetization()
  // TODO: use coil-monetization-v1 and update content script that sends
  // the events
  document.addEventListener('monetization-v1', function(event) {
    const { type, detail } = event.detail
    if (type === 'monetizationstatechange') {
      document.monetization.state = detail.state
    } else {
      document.monetization.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        }))
    }
  })
  {
    const dbg = () => {
    }
    dbg('setonmonetization property start')
    const handlers = new WeakMap()
    var attributes = {
      enumerable: true,
      configurable: false,
      get() {
        return handlers.get(this) || null
      },
      set(val) {
        dbg('set onmonetization called, with', val)
        const listener = handlers.get(this)
        if (listener && listener === val) {
          // nothing to do here ?
          return
        }
        const removeAnyExisting = () => {
          if (listener) {
            dbg('removing existing listener')
            this.removeEventListener('monetization', listener)
          }
        }
        if (val == null /* OR undefined*/) {
          handlers.delete(this)
          removeAnyExisting()
        } else if (typeof val === 'function') {
          removeAnyExisting()
          this.addEventListener('monetization', val)
          handlers.set(this, val)
        } else {
          throw new Error("val must be a function, got " + typeof val)
        }
      }
    }

    const supportsOriginal = DOMTokenList.prototype.supports
    const supportsMonetization = Symbol.for('link-supports-monetization')
    DOMTokenList.prototype.supports = function(token) {
      if (this[supportsMonetization] && token === 'monetization') {
        return true
      } else {
        return supportsOriginal.call(this, token)
      }
    }

    const relList = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'relList')
    const relListGetOriginal = relList.get

    relList.get = function() {
      const val = relListGetOriginal.call(this)
      val[supportsMonetization] = true
      return val
    }

    Object.defineProperty(HTMLLinkElement.prototype, 'relList', relList)
    Object.defineProperty(HTMLElement.prototype, 'onmonetization', attributes)
    Object.defineProperty(Window.prototype, 'onmonetization', attributes)
    dbg('setonmonetization property end')
    dbg('add coil-onmonetization-v2-attr-changed handler start')

    //
    class MonetizationEvent extends Event {
      constructor(type, details) {
        super('monetization', { bubbles: true })
        Object.assign(this, details)
      }

      get [Symbol.toStringTag]() {
        return 'MonetizationEvent'
      }
    }

    window.MonetizationEvent = MonetizationEvent

    window.addEventListener('coil-monetization', (event) => {
      dbg(
        'coil-monetization event'
      )
      const monetizationEvent = new MonetizationEvent('monetization', event.detail)
      event.target.dispatchEvent(monetizationEvent)
    }, { capture: true })
    window.addEventListener('onmonetization-attr-changed', (event) => {
      dbg('onmonetization-attr-changed', event.detail.attribute)
      const { attribute } = event.detail
      if (attribute) {
        // TODO: what are the CSP issues here?
        // is there any alternative ??
        event.target.onmonetization = new Function(attribute).bind(event.target)
      } else {
        event.target.onmonetization = null
      }
    }, { capture: true })
    dbg('add coil-onmonetization-v2-attr-changed handler end')
  }
`

// language=JavaScript
export const wmPolyfill = `
  ${wmPolyFillMinimal}

  if (localStorage.WM_DEBUG) {
    ${basicEventsLoggingCode}
  }

  if (localStorage.WM_DEBUG_PROGRESS) {
    ${progressLoggingCode}
  }
`

export const includePolyFillMessage = `
Unable to inject \`document.monetization\` polyfill!
Include the polyfill in your page:
<script type="application/javascript">${wmPolyFillMinimal}</script>
`
