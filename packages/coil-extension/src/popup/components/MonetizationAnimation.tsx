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

  return (
    <>
      {animated ? (
        <img
          key={'monetized-animation-svg'}
          src='/res/stream_loop.svg'
          width='171'
          height='22'
        />
      ) : (
        <img
          key={'monetized-animation-svg'}
          src='/res/stream_still.svg'
          width='171'
          height='22'
        />
      )}
    </>
  )
}
