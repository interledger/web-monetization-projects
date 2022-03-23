import React, { createContext, useContext, useState } from 'react'

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

// Context
const RouterContext = createContext({} as IRouterContext)

// Provider
export const RouterProvider: React.FC = props => {
  const [route, setRoute] = useState<string>(ROUTES.streaming)
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
