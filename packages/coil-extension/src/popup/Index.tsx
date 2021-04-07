import React, { useEffect, useState } from 'react'

import { ToPopupMessage } from '../types/commands'

import { PopupProps } from './types'
import { LoggedOutView } from './components/views/LoggedOutView'
import { UnsubscribedView } from './components/views/UnsubscribedView'
import { CoilExploreView } from './components/views/CoilExploreView'
import { CoilPopupView } from './components/views/CoilPopupView'
import { TipRouter } from './components/views/TipRouter'
import { MonetizedRouter } from './components/views/MonetizedRouter'
import { UnmonetizedPageView } from './components/views/UnmonetizedPageView'

export function Index(props: PopupProps): React.ReactElement {
  const [_, setLastMonetizationProgress] = useState(Date.now())

  function syncStoreAndSetState() {
    props.context.store.sync()
    setLastMonetizationProgress(Date.now())
  }

  function bindMessageListener(): void {
    props.context.runtime.onMessageAddListener((message: ToPopupMessage) => {
      if (message.command === 'localStorageUpdate') {
        syncStoreAndSetState()
      }
      return false
    })
  }

  useEffect(bindMessageListener, [])

  const context = { ...props.context }
  const { validToken, user, monetized, coilSite } = props.context.store

  //* Moved all the render logic from Status, PaidViews, CoilViews, and MonetizedPage here to Index
  //* Not sure how I feel about the readability vs the original method.

  //
  // Invalid user views
  //
  if (!validToken && !user) {
    return <LoggedOutView context={context} />
  }
  if (!user.subscription || (user.subscription && !user.subscription.active)) {
    return <UnsubscribedView context={context} />
  }

  //
  // Paid views
  //

  // Coil views
  if (coilSite && !monetized) {
    // CoilViews
    const { pathname } = new URL(coilSite)

    if (pathname === '/explore') {
      return <CoilExploreView context={context} />
    } else {
      return <CoilPopupView context={context} />
    }
  }

  // Monetized views
  if (monetized) {
    const showNewTipUi = user.canTip
    // const showNewTipUi = false
    if (showNewTipUi) {
      return <TipRouter context={context} /> // handles the tip views based on local state
    } else {
      return <MonetizedRouter context={context} /> // handles the monetized views based on local state
    }
  } else {
    // Non Monetized Page
    return <UnmonetizedPageView context={context} />
  }

  return null
}
