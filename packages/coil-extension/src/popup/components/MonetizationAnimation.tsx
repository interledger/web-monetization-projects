import React, { useEffect, useRef, useState } from 'react'

import { PopupProps } from '../types'
import { ToPopupMessage } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'

const ANIMATION_INTERVAL = 1800

export const MonetizeAnimation = (props: PopupProps) => {
  const [lastPacket, setLastPacket] = useState<Date | null>(null)
  const [animated, setAnimated] = useState<boolean | null>(false)
  const lastPacketRef = useRef(lastPacket)
  lastPacketRef.current = lastPacket

  useEffect(() => {
    let animateTimeout: number | null

    const loopHandler = () => {
      const now = new Date()
      const lastPacketPlus2s = new Date(notNullOrUndef(lastPacketRef.current))
      lastPacketPlus2s.setSeconds(lastPacketPlus2s.getSeconds() + 2)
      if (now > lastPacketPlus2s) {
        animateTimeout = null
        setAnimated(false)
      } else {
        animateTimeout = window.setTimeout(loopHandler, ANIMATION_INTERVAL)
      }
    }

    const listener = (msg: ToPopupMessage) => {
      if (
        msg.command === 'localStorageUpdate' &&
        msg.key === 'monetizedTotal'
      ) {
        setLastPacket(new Date())
        setAnimated(true)
        if (!animateTimeout) {
          window.setTimeout(loopHandler, ANIMATION_INTERVAL)
        }
      }
    }
    props.context.runtime.onMessageAddListener(listener)
    return () => {
      props.context.runtime.onMessageRemoveListener(listener)
      if (animateTimeout != null) {
        clearTimeout(animateTimeout)
      }
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
