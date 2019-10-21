import { useCallback, useState } from 'react'

export interface UseShowIfClickedParams {
  clicksRequired: number
  withinMs: number
  key: string
}

export const useShowIfClicked = ({
  clicksRequired,
  withinMs,
  key
}: UseShowIfClickedParams) => {
  const [lastClicks] = useState<number[]>([])
  const [shown, setShown] = useState(!!localStorage.getItem(key))

  const onClick = useCallback(() => {
    lastClicks.push(Date.now())
    while (lastClicks.length > clicksRequired) {
      lastClicks.shift()
    }
    if (
      lastClicks.length === clicksRequired &&
      lastClicks[lastClicks.length - 1] - lastClicks[0] <= withinMs
    ) {
      const toggled = !shown
      lastClicks.splice(0, lastClicks.length)
      setShown(toggled)
      if (toggled) {
        localStorage.setItem(key, '1')
      } else {
        localStorage.removeItem(key)
      }
    }
  }, [shown])
  return [shown, onClick] as [boolean, typeof onClick]
}
