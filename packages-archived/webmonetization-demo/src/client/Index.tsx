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
} from '@webmonetization/react'

function pretty(val: unknown) {
  return JSON.stringify(val, null, 2)
}

/**
 * Set via webpack
 */
declare const PAYMENT_POINTER: string
declare const VERIFIER_URL: string

const Index = hot(() => {
  const state = useMonetizationState()
  const counter = useMonetizationCounter()

  const paymentPointers = [
    PAYMENT_POINTER,
    `${VERIFIER_URL}/${encodeURIComponent(PAYMENT_POINTER)}`
  ]
  const [paymentPointer, setPaymentPointer] = useState<string>(
    paymentPointers[0]
  )
  const [serverBalance, setServerBalance] = useState<string | null>(null)
  const [useReceipts, setUseReceipts] = useState<boolean>(true)

  const toggleReceipts = () => setUseReceipts(!useReceipts)

  async function getBalance(requestId: string) {
    const resp = await fetch(`http://localhost:4002/balances/${requestId}`)
    if (resp.ok) {
      setServerBalance(await resp.json())
    }
  }

  useEffect(() => {
    async function submitReceipt(requestId: string, receipt: string) {
      const resp = await fetch(
        `http://localhost:4002/balances/${requestId}:creditReceipt`,
        {
          method: 'POST',
          body: receipt
        }
      )
      if (resp.ok) {
        getBalance(requestId)
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
    if (counter.requestId) {
      getBalance(counter.requestId)
    }
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
        <div>
          <pre> Using verifier SPSP endpoint to proxy to receiver </pre>
          <pre> {counter.requestId} Balance: </pre>
          <pre>{serverBalance} </pre>
        </div>
      )}
      {!useReceipts && <pre> Sending directly to receiver </pre>}
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
