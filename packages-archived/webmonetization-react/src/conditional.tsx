import React, { useEffect, useState } from 'react'

import { useMonetizationState } from './state'

export type Children = Array<React.ReactNode> | React.ReactText

export function IfWebMonetized({
  children,
  showOnPending
}: {
  children?: Children
  showOnPending?: boolean
}) {
  const { state } = useMonetizationState()

  if (state === 'started' || (state === 'pending' && showOnPending)) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export function IfNotWebMonetized({
  children,
  pendingTimeout = 2000
}: {
  children?: Children
  pendingTimeout?: number
}) {
  const [pendingTimedOut, setPendingTimedOut] = useState(false)
  const { state } = useMonetizationState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setPendingTimedOut(true)
    }, pendingTimeout)

    return () => {
      clearTimeout(timer)
    }
  })

  if (state === 'started' || (state === 'pending' && !pendingTimedOut)) {
    return <></>
  } else {
    return <>{children}</>
  }
}

export function IfWebMonetizationPending({
  children
}: {
  children?: Children
}) {
  const { state } = useMonetizationState()

  if (state === 'pending') {
    return <>{children}</>
  } else {
    return <></>
  }
}
