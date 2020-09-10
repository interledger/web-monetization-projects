import React, { useEffect, useRef, useState } from 'react'

import { PopupProps } from '../types'
import { ToPopupMessage } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'

const ANIMATION_INTERVAL = 1800

export const MonetizeAnimation = (props: PopupProps) => {
  const isPaying = localStorage.getItem('isPaying') === 'true'
  const [animated, setAnimated] = useState<boolean>(isPaying)

  useEffect(() => {
    const loopInterval = setInterval(() => {
      setAnimated(localStorage.getItem('isPaying') === 'true')
    }, ANIMATION_INTERVAL)

    return () => {
      clearInterval(loopInterval)
    }
  }, [])

  const hasMonetized = props.context.store.monetizedTotal > 0
  // eslint-disable-next-line no-nested-ternary
  const src = animated
    ? '/res/stream_loop.svg'
    : hasMonetized
    ? '/res/stream_still.svg'
    : '/res/stream_connect_2.svg'

  return <img key={src} alt='animation' src={src} width='171' height='22' />
}
