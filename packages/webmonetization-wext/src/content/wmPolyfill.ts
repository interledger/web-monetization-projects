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
  document.monetization = document.createElement('div')
  document.monetization.state = 'stopped'
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
    const dbg = () => {}
    // dbg('setonmonetization property start')
    const handlers = new WeakMap()
    Object.defineProperty(HTMLElement.prototype, 'onmonetization', {
      enumerable: true,
      configurable: true,
      get() {
        return handlers.get(this)
      },
      set(val) {
        // dbg('set onmonetization called, with', val)
        const listener = handlers.get(this)
        if (listener) {
          // dbg('removing existing listener')
          this.removeEventListener('monetization', listener)
        }

        if (val === null) {
          handlers.delete(this)
        } else {
          this.addEventListener('monetization', val)
          handlers.set(this, val)
        }
      }
    })
    // dbg('setonmonetization property end')
    // dbg('add coil-onmonetization-attr-changed handler start')
    class MonetizationEvent extends Event {
      constructor(type, details) {
        super('monetization', {bubbles: true})
        Object.assign(this, details)
      }
      
      get [Symbol.toStringTag] () {
        return 'MonetizationEvent'
      }
    }

    document.addEventListener('coil-monetization', (event) => {
      // dbg(
      //   'coil-monetization event'
      // )
      const monetizationEvent = new MonetizationEvent('monetization', event.detail)
      event.target.dispatchEvent(monetizationEvent)
    })
    document.addEventListener('coil-onmonetization-attr-changed', (event) => {
      // dbg('coil-onmonetization-attr-changed', event.detail.attribute)
      const { attribute } = event.detail
      if (attribute) {
        event.target.onmonetization = new Function(attribute).bind(event.target)
      } else {
        event.target.onmonetization = null
      }
    })
    // dbg('add coil-onmonetization-attr-changed handler end')
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
