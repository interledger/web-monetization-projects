const inject = () => {
  const script = document.createElement('script')
  script.id = '__monetize_polyfill'
  // Language=JavaScript
  script.innerHTML = `
function u8tohex (arr) {
  var vals = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ]
  var ret = ''
  for (var i = 0; i < arr.length; ++i) {
    ret += vals[(arr[i] & 0xf0) / 0x10]
    ret += vals[(arr[i] & 0x0f)]
  }
  return ret
}
function getRandomId () {
  var idBytes = new Uint8Array(16)
  crypto.getRandomValues(idBytes)
  return u8tohex(idBytes)
}
function monetize ({ receiver }) {
  const id = getRandomId()
  const response = new Promise((resolve, reject) => {
    function responseListener (ev) {
      const msg = ev.detail
      if (msg.id !== id) return
      setTimeout(() => document.removeEventListener('ilp_pay_response', responseListener), 0)
      console.log('got message:', msg)
      if (msg.result) {
        resolve()
      } else {
        reject(new Error('failed to pay'))
      }
    }
    document.addEventListener('ilp_pay_response', responseListener)
  })
  document.dispatchEvent(new CustomEvent('ilp_pay_request', { detail: { id, receiver } }))
  return response
}
window.monetize = monetize
window.ILP = ILP
document.documentElement.removeChild(document.getElementById('__monetize_polyfill'))
`
  document.documentElement.appendChild(script)
}

const listen = () => {
  // const connection = chrome.runtime.connect({ name: 'ilp_rpc' })
  document.addEventListener('ilp_pay_request', (ev: Event) => {
    if (!(ev instanceof CustomEvent)) {
      return
    }
    const msg = ev.detail
    const request = { command: 'pay', msg }

    chrome.runtime.sendMessage(request, result => {
      document.dispatchEvent(
        new CustomEvent('ilp_pay_response', {
          detail: {
            id: msg.id,
            result
          }
        })
      )
    })
  })
}

listen()
inject()
