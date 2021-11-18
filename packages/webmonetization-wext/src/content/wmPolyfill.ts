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
  const selector = 'link[rel="monetization"]'

  class Monetization extends EventTarget {
    state = 'idle'

    get [Symbol.toStringTag]() {
      return 'Monetization'
    }


    toJSON() {
      const json = {state: this.state}
      if (Monetization.prototype.hasOwnProperty('pointer')) {
        json['pointer'] = this.pointer
      }
      return json
    }
  }

  if (localStorage.WM_POINTER_PROPERTY) {
    Object.defineProperty(Monetization.prototype, 'pointer', {
      enumerable: true,
      configurable: true,
      writeable: true,
        get() {
          const link = document.querySelector(selector)
          if (link && link.hasAttribute('href')) {
            return link.getAttribute('href')
          }
          return null
        },

        set(val) {
          // Hello PPK :)
          // NOTE: document.title will edit an existing <title> tag, and
          // append a <title> if none exist
          if (val === null) {
            const existing = document.querySelector(selector)
            if (existing) {
              existing.remove()
            }
          } else if (typeof val !== 'string') {
            throw new Error('pointer must be https:// url string')
          } else {
            let link = document.querySelector(selector)
            if (!link) {
              link = document.createElement('link')
              link.setAttribute('rel', 'monetization')
              link.setAttribute('href', val)
              document.head.appendChild(link)
            }
          }
        }
      }
    )
  }

  navigator.monetization = new Monetization()

  document.monetization = new EventTarget()
  document.monetization.state = 'stopped'

  document.addEventListener('monetization-v1', function(event) {
    const { type, detail } = event.detail
    if (type === 'monetizationstatechange') {
      // document.monetization
      document.monetization.state = detail.state

      // navigator.monetization
      const oldState = navigator.monetization.state

      let newState
      // TODO: when exactly is interactive ???
      if (detail.state === 'started') {
        newState = 'interactive'
      }
      // if (detail.state === 'pending') {
      //   newState = 'interactive'
      // }
      if (detail.state === 'stopped') {
        newState = 'idle'
      }
      if (newState && (newState !== oldState)) {
        navigator.monetization.state = newState
        const stateChange = new CustomEvent('statechange')
        navigator.monetization.dispatchEvent(stateChange)
      }
    } else {
      document.monetization.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        }))
      if (type === 'monetizationprogress') {
        navigator.monetization.dispatchEvent(
          new CustomEvent('monetization', { detail: detail }))
      }
    }
  })
`

// language=JavaScript
export const wmPolyfill = `
  ${wmPolyFillMinimal}

  if (localStorage.WM_DEBUG) {
    ${basicEventsLoggingCode}
    navigator.monetization.addEventListener('statechange', (e) => {
      console.log(
        '%c Web-Monetization-2 statechange event: %s',
        'color: aqua; background-color: black', navigator.monetization.state)
    })
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
