import React, { createContext, useContext, useState } from 'react'
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
  storage: Pick<StorageService, 'get'>
}

// Context
const RouterContext = createContext({} as IRouterContext)

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

  const [route, setRoute] = useState<string>(
    !isCoilSiteView && allowTipping ? ROUTES.tipping : ROUTES.streaming
  )
  const [previousRoute, setPreviousRoute] = useState<string>('')

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
