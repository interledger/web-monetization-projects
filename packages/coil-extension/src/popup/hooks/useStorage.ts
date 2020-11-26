import { useEffect, useState } from 'react'

export const useStorage = <T>(key: string, defaultValue: T) => {
  // TODO: useContext, with overrideable storage
  const storage = localStorage

  const [value, setValue] = useState<string | null>(storage.getItem(key))
  useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === storage) {
        setValue(event.newValue)
      }
    }
    window.addEventListener('storage', listener)
    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key])
  return [value ?? defaultValue, setValue] as [T, typeof setValue]
}
