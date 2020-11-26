import { useEffect, useState } from 'react'

import { PopupProps } from '../types'

export const useStorage = <T>(
  props: PopupProps,
  key: string,
  defaultValue: T
) => {
  const { store: storeTyped, events } = props.context
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = storeTyped as any
  const [value, setValue] = useState<T>(store[key])
  useEffect(() => {
    const listener = (event: Pick<StorageEvent, 'key' | 'newValue'>) => {
      if (event.key === key) {
        setValue(store[key])
      }
    }
    events.on('storage', listener)
    return () => {
      events.removeListener('storage', listener)
    }
  }, [key])
  return [value ?? defaultValue, setValue] as [T, typeof setValue]
}
