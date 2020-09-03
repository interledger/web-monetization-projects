import { MonetizationExtendedDocument } from '@web-monetization/types'

import { MonetizationImplTest } from './index'

function makeLogger(logElSelector: string) {
  const logEl = document.querySelector(logElSelector)
  if (!logEl) {
    throw new Error(`missing #log element in document`)
  }
  return (s: string) => {
    logEl.innerHTML += `${s}\n`
    console.log('LOG:', s)
  }
}

;(async function main() {
  const log = makeLogger('#log')

  const suite = new MonetizationImplTest(
    document as MonetizationExtendedDocument,
    window,
    log
  )

  try {
    await suite.test()
  } catch (e) {
    log('')
    log('Last Error:')
    log(e.message)
  }
})()
