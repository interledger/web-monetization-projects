const events = [
  'monetizationstart',
  'monetizationstop',
  'monetizationpending',
  'tip'
  // Don't log these events
  // 'monetizationprogress'
]

const eventLoggingCode = events
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

// language=JavaScript
export const wmPolyFillMinimal = `
  document.monetization = document.createElement('div')
  document.monetization.state = 'stopped'
  document.addEventListener('monetization-v1', function(event) {
    const {type, detail} = event.detail
    if (type === 'monetizationstatechange') {
      document.monetization.state = detail.state
    } else {
      document.monetization.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        }))
    }
  })
`

// language=JavaScript
export const wmPolyfill = `
  ${wmPolyFillMinimal}

  if (localStorage.WM_DEBUG) {
    ${eventLoggingCode}
  }
`

async function sha256(preimage: Buffer): Promise<string> {
  const digest = await crypto.subtle.digest({ name: 'SHA-256' }, preimage)
  return `sha256-${Buffer.from(digest).toString('base64')}`
}

sha256(Buffer.from(wmPolyfill, 'utf8')).then(
  console.log.bind(console, 'wmPolyfill hash:')
)

export const includePolyFillMessage = `
Unable to inject \`document.monetization\` polyfill!
Include the polyfill in your page:
<script type="application/javascript">${wmPolyFillMinimal}</script>
`
