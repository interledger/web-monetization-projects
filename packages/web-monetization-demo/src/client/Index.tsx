import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import {
  IfNotWebMonetized,
  IfWebMonetizationPending,
  IfWebMonetized,
  useMonetizationCounter,
  useMonetizationState
} from '@web-monetization/react'

function pretty(val: unknown) {
  return JSON.stringify(val, null, 2)
}

const Index = hot(() => {
  const state = useMonetizationState()
  const counter = useMonetizationCounter()

  const [serverBalance, setServerBalance] = useState<number | null>(null)
  useEffect(() => {
    if (state.requestId) {
      setInterval(async () => {
        const resp = await fetch(
          `http://localhost:4000/balance/${state.requestId}`
        )
        if (resp.ok) {
          const body = await resp.json()
          setServerBalance(body.balance)
        }
      }, 1e3)
    }
  }, [state.requestId])
  useEffect(() => {
    async function submitReceipt(requestId: string, receipt: string) {
      const resp = await fetch(
        `http://localhost:4000/balance/${requestId}:creditReceipt`,
        {
          method: 'POST',
          body: receipt
        }
      )
      if (resp.ok) {
        const body = await resp.json()
        setServerBalance(body.balance)
      }
    }
    if (counter.requestId && counter.receipt) {
      submitReceipt(counter.requestId, counter.receipt)
    }
  }, [counter.receipt])
  return (
    <div>
      <h1>Web-Monetization Demo</h1>
      <pre>(React) useMonetizationState: {pretty(state)}</pre>

      <pre>(React) useMonetizationCounter: {pretty(counter)}</pre>

      <pre>
        (React) IfNotWebMonetized: <IfNotWebMonetized>Yes</IfNotWebMonetized>
      </pre>

      <pre>
        (React) IfWebMonetized: <IfWebMonetized>Yes</IfWebMonetized>
      </pre>

      <pre>
        (React) IfWebMonetizationPending:{' '}
        <IfWebMonetizationPending>Yes</IfWebMonetizationPending>
      </pre>
      <pre>(Server Poll=1s) Balance: {serverBalance}</pre>
    </div>
  )
})

ReactDOM.render(<Index />, document.querySelector('#root'))
