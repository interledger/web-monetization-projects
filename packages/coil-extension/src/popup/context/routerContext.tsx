import React, { createContext, useContext, useEffect, useState } from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { ROUTES } from '../constants'

//
// Models
//
interface IRouterContext {
  path: string
  previousPath: string
  to: (str: string) => void
  back: () => void
}

interface IRouterProvider {
  storage: Pick<StorageService, 'get' | 'set'>
}

// Context
const RouterContext = createContext({} as IRouterContext)

const lastRoute = 'popup-route:last'
const tippingShown = 'popup-route:tipping-shown'

// Provider
export const RouterProvider: React.FC<IRouterProvider> = props => {
  const { storage } = props
  const userObject = storage.get('user')
  const coilSite = storage.get('coilSite')

  // Determine the default view based on if the user is allowed to tip
  const {
    tippingBetaFeatureFlag,
    extensionNewUiFeatureFlag,
    tipSettings: { totalTipCreditAmountUsd = 0 } = {}
  } = userObject ?? {}

  const allowTipping =
    extensionNewUiFeatureFlag &&
    ((!tippingBetaFeatureFlag && totalTipCreditAmountUsd > 0) ||
      tippingBetaFeatureFlag)

  const isCoilSiteView =
    typeof coilSite === 'string' &&
    ['/', '/discover'].includes(new URL(coilSite).pathname)

  const showTipping = !isCoilSiteView && allowTipping
  const defaultRoute = showTipping ? ROUTES.tipping : ROUTES.streaming

  const lastOrDefaultRoute =
    storage.get(lastRoute) && (storage.get(tippingShown) || !allowTipping)
      ? storage.get(lastRoute)
      : defaultRoute

  const [route, setRoute] = useState<string>(lastOrDefaultRoute)
  const [previousRoute, setPreviousRoute] = useState<string>('')

  useEffect(() => {
    if (!route.includes('/')) {
      storage.set(lastRoute, route)
      if (route === ROUTES.tipping) {
        storage.set(tippingShown, true)
      }
    }
  }, [route])

  const toRoute = (newRoute: string) => {
    setPreviousRoute(route)
    setRoute(newRoute)
  }

  const goBack = () => {
    setRoute(previousRoute)
  }

  const providerValue = {
    path: route,
    previousPath: previousRoute,
    to: toRoute,
    back: goBack
  }
  return (
    <RouterContext.Provider value={providerValue}>
      {props.children}
    </RouterContext.Provider>
  )
}

// Hook
export const useRouter = () => {
  const context = useContext(RouterContext)
  return context
}
