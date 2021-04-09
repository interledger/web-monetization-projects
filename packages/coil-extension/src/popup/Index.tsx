import React from 'react'
import { StorageService } from '@web-monetization/wext/services'

import { withSharedTheme } from '../shared-theme/withSharedTheme'

import { ViewRouter } from './components/views/ViewRouter'
import { PopupHost } from './types'
import { PopupHostContext } from './context/popupHostContext'
import { StoreContext, useStoreState } from './context/storeContext'

export function Index(props: {
  storage: Pick<StorageService, 'get'>
  host: PopupHost
}) {
  const store = useStoreState(props.storage, props.host)

  return (
    <PopupHostContext.Provider value={props.host}>
      <StoreContext.Provider value={store}>
        <ViewRouter />
      </StoreContext.Provider>
    </PopupHostContext.Provider>
  )
}

export const IndexWithRoot = withSharedTheme(Index)
