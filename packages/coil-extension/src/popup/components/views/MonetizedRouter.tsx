/*
    MonetizedRouter
    
    The monetized router is responsible for using local state to determine which state view is rendered
*/

import React, { useEffect, useState } from 'react'

import { useHost } from '../../context/popupHostContext'

import { MonetizedDonatingView } from './MonetizedDonatingView'
import { MonetizedRateLimitedView } from './MonetizedRateLimitedView'

//
// Component
//
export const MonetizedRouter = () => {
  const { runtime } = useHost()
  const [limitRefreshDate, setLimitRefreshDate] = useState<string | null>(null)

  useEffect(() => {
    runtime.sendMessage(
      {
        command: 'isRateLimited'
      },
      result => {
        if (result && result.limitExceeded) {
          const date = new Date(result.limitRefreshDate)
          const formatted = date.toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
          setLimitRefreshDate(formatted)
        }
      }
    )
  }, [])

  if (limitRefreshDate != null) {
    // Show the Rate limited view
    return <MonetizedRateLimitedView limitRefreshDate={limitRefreshDate} />
  } else {
    // Show the donating view
    return <MonetizedDonatingView />
  }
}
