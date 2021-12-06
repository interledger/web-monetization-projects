import React, { createContext, useContext, useState } from 'react'

import { ROUTES } from '../contants'

const RouterContext = createContext(ROUTES.streaming)

export const RouterProvider: React.FC = props => {
  const [route, setRoute] = useState(ROUTES.streaming)
  const [backRoute, setBackRoute] = useState(null)
  const toRoute = (newRoute: ROUTES) => {
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

export const useRouter = () => {
  const context = useContext(RouterContext)
  return context
}
