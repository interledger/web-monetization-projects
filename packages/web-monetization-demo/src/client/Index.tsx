import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
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

/**
 * When using https://github.com/coilhq/receipt-verifier
 * via `yarn receipt-verifier`
 * the SPSP Proxy API and Balances API will be on different ports
 * Set via webpack
 */
declare const USE_RECEIPT_VERIFIER: boolean

const Index = hot(() => {
  const state = useMonetizationState()
  const counter = useMonetizationCounter()

  const paymentPointers = [
    'http://localhost:4000/spsp/~niq',
    'http://localhost:4001/spsp/~niq'
  ]
  const [paymentPointer, setPaymentPointer] = useState<string>(
    paymentPointers[0]
  )
  const [serverBalance, setServerBalance] = useState<number | null>(null)
  const [useReceipts, setUseReceipts] = useState<boolean>(true)
  const balancesPort = USE_RECEIPT_VERIFIER ? 4002 : 4001

  const toggleReceipts = () => setUseReceipts(!useReceipts)
  useEffect(() => {
    async function submitReceipt(requestId: string, receipt: string) {
      const resp = await fetch(
        `http://localhost:${balancesPort}/balances/${requestId}:creditReceipt`,
        {
          method: 'POST',
          body: receipt
        }
      )
      if (resp.ok) {
        const body = await resp.json()
        setServerBalance(body)
      }
    }
    if (counter.requestId && counter.receipt) {
      submitReceipt(counter.requestId, counter.receipt)
    }
  }, [counter.receipt])
  useEffect(() => {
    setPaymentPointer(paymentPointers[+useReceipts])
  }, [useReceipts])
  useEffect(() => {
    setServerBalance(0)
  }, [counter.requestId])
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Web-Monetization Demo</title>
        <meta name='monetization' content={paymentPointer} />
      </Helmet>
      <h1>Web-Monetization Demo</h1>
      <form>
        <label>
          Use receipts:
          <input
            name='useReceipts'
            type='checkbox'
            checked={useReceipts}
            onChange={toggleReceipts}
          />
        </label>
      </form>
      <pre> Payment Pointer: {paymentPointer} </pre>
      {useReceipts && (
        <pre> Using verifier SPSP endpoint to proxy to receiver </pre>
      )}
      {!useReceipts && <pre> Sending directly to receiver </pre>}
      {useReceipts && (
        <pre>
          {counter.requestId} Balance: {serverBalance}
        </pre>
      )}
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
    </div>
  )
})

ReactDOM.render(<Index />, document.querySelector('#root'))
