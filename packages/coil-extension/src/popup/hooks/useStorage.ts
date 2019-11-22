import { useEffect, useState } from 'react'

import { PopupContext } from '../types'
import { ToPopupMessage } from '../../types/commands'
import { PopupStateType } from '../services/PopupState'

export type StorageValues = PopupStateType[keyof PopupStateType]

export function useStorage<
  K extends keyof PopupStateType,
  T = PopupStateType[K]
>(key: K, context: PopupContext) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = (context.store as unknown) as Record<string, StorageValues>
  const storeElement = () => (store[key] as unknown) as T
  const [value, setValue] = useState<T>(storeElement)

  useEffect(() => {
    const listener = (message: ToPopupMessage) => {
      if (message.command === 'localStorageUpdate' && message.key === key) {
        // Given these messages are async to start with it's fine to just
        // react a little later to start with.
        // TODO: ensure the root listener is bound first or something better
        // DOES React bind depth first ?
        // context.store.sync([message.key])
        setTimeout(() => {
          setValue(storeElement)
        }, 0)
      }
    }
    context.runtime.onMessageAddListener(listener)
    return () => {
      context.runtime.onMessageRemoveListener
    }
  }, [])

  return value
}
