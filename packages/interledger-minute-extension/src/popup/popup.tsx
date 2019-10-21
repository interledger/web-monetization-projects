/* eslint-disable @typescript-eslint/no-non-null-assertion */

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import { makeDebug } from '../logging'

const debug = makeDebug('popup')

async function loadData() {
  return new Promise<{ sites: [] }>(resolve => {
    chrome.runtime.sendMessage({ command: 'stats' }, result => {
      debug('RESULT:', result)
      resolve(result)
    })
  })
}

async function refresh() {
  const { sites } = await loadData()
  const statsTable = document.getElementById('site_stats_body')!
  const entries = 6

  for (let i = 0; i < entries; ++i) {
    const site = sites[i] || { host: '&nbsp;', amount: '&nbsp;' }
    const row = statsTable.querySelectorAll('tr')[i]!
    const host = row.querySelector('td')!
    const amount = row.querySelector('th')!
    host.innerHTML = site.host

    const siteAmount = Number(site.amount)

    if (!siteAmount) {
      amount.innerHTML = site.amount
      continue
    }

    if (!Number(amount.innerHTML)) {
      amount.innerHTML = (siteAmount / 1e6).toFixed(6)
      continue
    }

    let currentAmount = Math.floor((Number(amount.innerHTML) || 0) * 1e6)
    const targetAmount = siteAmount
    const animateInterval = setInterval(() => {
      currentAmount += Math.sign(targetAmount - currentAmount)
      amount.innerHTML = (currentAmount / 1e6).toFixed(6)
      if (currentAmount === targetAmount) {
        clearInterval(animateInterval)
      }
    }, 10)
  }
}

refresh().then(() => {
  debug('data loaded')
})

setInterval(refresh, 500)
