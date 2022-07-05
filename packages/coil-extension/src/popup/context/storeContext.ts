import { createContext, useContext, useEffect, useState } from 'react'
import { StoreService } from '@webmonetization/wext/services'

import { PopupStateType, STORAGE_KEYS } from '../services/PopupState'
import { PopupHost } from '../types'
import { StoreUpdate } from '../../types/commands'

export const useStoreState = (
  storage: Pick<StoreService, 'get'>,
  host: PopupHost
): PopupStateType => {
  const [store, setStore] = useState<PopupStateType>({} as PopupStateType)
  const [init, setInit] = useState(false)
  if (!init) {
    const defaultValue: Record<string, unknown> = {}
    STORAGE_KEYS.forEach(k => {
      defaultValue[k] = storage.get(k)
    })
    setStore(defaultValue)
    setInit(true)
  }
  useEffect(() => {
    const events = host.events
    events.on('storeUpdate', (evt: StoreUpdate['data']) => {
      if (evt.key && evt.value) {
        const key = evt.key
        setStore(old => ({
          ...old,
          [key]: storage.get(key)
        }))
      }
    })
  }, [])

  return store
}

export const StoreContext = createContext<PopupStateType>({})

export const useStore = () => {
  return useContext(StoreContext)
}
