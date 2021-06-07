import React, { useEffect, useState } from 'react'

import { useStore } from '../context/storeContext'

const ANIMATION_INTERVAL = 1800

export const MonetizeAnimation = () => {
  const store = useStore()
  const [animated, setAnimated] = useState<boolean | null>(
    Boolean(store.isPaying)
  )

  useEffect(() => {
    const loopInterval = setInterval(() => {
      setAnimated(Boolean(store.isPaying))
    }, ANIMATION_INTERVAL)

    return () => {
      clearInterval(loopInterval)
    }
  }, [])

  const hasMonetized = Number(store.monetizedTotal) > 0
  // eslint-disable-next-line no-nested-ternary
  const src = animated
    ? '/res/stream_loop.svg'
    : hasMonetized
    ? '/res/stream_still.svg'
    : '/res/stream_connect_2.svg'

  return <img key={src} alt='animation' src={src} width='171' height='22' />
}
