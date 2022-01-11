import React from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { withSharedTheme } from '../shared-theme/withSharedTheme'

import { PopupHost } from './types'
import { PopupHostContext } from './context/popupHostContext'
import { StoreContext, useStoreState } from './context/storeContext'
import { ViewRouter } from './components/views/ViewRouter'
import { RouterProvider } from './context/routerContext'
import { TipProvider } from './context/tipContext'

export function Index(props: {
  storage: Pick<StorageService, 'get'>
  host: PopupHost
}) {
  const store = useStoreState(props.storage, props.host)

  return (
    <PopupHostContext.Provider value={props.host}>
      <StoreContext.Provider value={store}>
        <RouterProvider>
          <TipProvider>
            {/* should replace ViewRouter with  NewExtension when done -> rename the NewExtension to something like App */}
            <ViewRouter />
          </TipProvider>
        </RouterProvider>
      </StoreContext.Provider>
    </PopupHostContext.Provider>
  )
}

export const IndexWithRoot = withSharedTheme(Index)
