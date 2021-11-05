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
  navigator.monetization = new EventTarget()
  navigator.monetization.state = 'idle'

  document.monetization = document.createElement('div')
  document.monetization.state = 'stopped'

  document.addEventListener('monetization-v1', function(event) {
    const {type, detail} = event.detail
    if (type === 'monetizationstatechange') {
      document.monetization.state = detail.state
      if (detail.state === 'started') {
        navigator.monetization.state = 'interactive'
      }
      if (detail.state === 'pending') {
        navigator.monetization.state = 'interactive'
      }
      if (detail.state === 'stopped') {
        navigator.monetization.state = 'idle'
      }
    } else {
      document.monetization.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        }))
      if (type === 'monetizationprogress') {
        navigator.monetization.dispatchEvent(
          new CustomEvent('monetization', {detail: detail}))
      }
    }
  })
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
