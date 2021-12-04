import type {
  MonetizationExtendedDocument,
  MonetizationObject
} from '@webmonetization/types'

{
  class Monetization extends EventTarget implements MonetizationObject {
    state = 'stopped' as const

    get [Symbol.toStringTag]() {
      // For some reason this isn't working, it's only using the class
      // name, but whatever, you still need to set SOMETHING else it will
      // be "EventTarget"
      return 'Monetization v1'
    }
  }

  const doc = document as MonetizationExtendedDocument
  doc.monetization = new Monetization()
  doc.addEventListener('monetization-v1', function (event: Event) {
    const { type, detail } = (event as CustomEvent).detail
    if (type === 'monetizationstatechange') {
      doc.monetization.state = detail.state
    } else {
      doc.monetization.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        })
      )
    }
  })

  doc.monetization.addEventListener('monetizationstart', e =>
    console.log(
      '%c Web-Monetization %s event:  %s',
      'color: aqua; background-color: black',
      e.type,
      JSON.stringify(e.detail)
    )
  )
  doc.monetization.addEventListener('monetizationstop', e =>
    console.log(
      '%c Web-Monetization %s event:  %s',
      'color: aqua; background-color: black',
      e.type,
      JSON.stringify(e.detail)
    )
  )
  doc.monetization.addEventListener('monetizationpending', e =>
    console.log(
      '%c Web-Monetization %s event:  %s',
      'color: aqua; background-color: black',
      e.type,
      JSON.stringify(e.detail)
    )
  )
}
