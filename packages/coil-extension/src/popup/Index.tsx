import React from 'react'
import { StoreService } from '@webmonetization/wext/services'

import { withSharedTheme } from '../shared-theme/withSharedTheme'

import { PopupHost } from './types'
import { PopupHostContext } from './context/popupHostContext'
import { StoreContext, useStoreState } from './context/storeContext'
import { ViewRouter } from './components/views/ViewRouter'
import { RouterProvider } from './context/routerContext'
import { TipProvider } from './context/tipContext'

export function Index(props: {
  storage: Pick<StoreService, 'get' | 'set'>
  host: PopupHost
}) {
  const store = useStoreState(props.storage, props.host)

  return (
    <PopupHostContext.Provider value={props.host}>
      <StoreContext.Provider value={store}>
        <RouterProvider storage={props.storage}>
          <TipProvider storage={props.storage} host={props.host}>
            {/* should replace ViewRouter with  NewExtension when done -> rename the NewExtension to something like App */}
            <ViewRouter />
          </TipProvider>
        </RouterProvider>
      </StoreContext.Provider>
    </PopupHostContext.Provider>
  )
}

export const IndexWithRoot = withSharedTheme(Index)
