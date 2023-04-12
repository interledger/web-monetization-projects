import { useEffect, useState } from 'react'

import { getGlobalWebMonetizationState } from './global'

export function useMonetizationCounter() {
  // get the singleton WM state
  const webMonetizationState = getGlobalWebMonetizationState()
  webMonetizationState.init()

  const [monetizationDetails, setMonetizationDetails] = useState(
    webMonetizationState.getState()
  )

  // create something we can mutate
  const monetizationDetailsCopy = { ...monetizationDetails }

  useEffect(() => {
    const onEvent = () => {
      // this is purposely mutating because sometimes we get multiple state
      // updates before reload
      setMonetizationDetails(
        Object.assign(monetizationDetailsCopy, webMonetizationState.getState())
      )
    }

    webMonetizationState.on('monetizationstop', onEvent)
    webMonetizationState.on('monetizationstart', onEvent)
    webMonetizationState.on('monetizationprogress', onEvent)

    return () => {
      webMonetizationState.removeListener('monetizationstart', onEvent)
      webMonetizationState.removeListener('monetizationstop', onEvent)
      webMonetizationState.removeListener('monetizationprogress', onEvent)
    }
  })

  return monetizationDetails
}
