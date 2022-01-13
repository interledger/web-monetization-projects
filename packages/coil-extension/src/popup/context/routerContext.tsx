import React, { createContext, useContext, useState } from 'react'

import { ROUTES } from '../constants'

//
// Models
//
interface IRouterContext {
  path: string
  to: (str: string) => void
  back: () => void
}

// Context
const RouterContext = createContext({} as IRouterContext)

// Provider
export const RouterProvider: React.FC = props => {
  const [route, setRoute] = useState<string>(ROUTES.streaming) // todo: set default to 'streaming'
  const [backRoute, setBackRoute] = useState<string>(ROUTES.streaming)
  const toRoute = (newRoute: string) => {
    setBackRoute(route)
    setRoute(newRoute)
  }
  const goBack = () => {
    setRoute(backRoute)
  }

  const providerValue = { path: route, to: toRoute, back: goBack }
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
