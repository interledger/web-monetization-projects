import React, { useEffect, useRef, useState } from 'react'

import { notNullOrUndef } from '../../util/nullables'
import { StorageEventPartial, useStore } from '../context/storeContext'
import { useHost } from '../context/popupHostContext'

const ANIMATION_INTERVAL = 1800

export const MonetizeAnimation = () => {
  const store = useStore()
  const host = useHost()

  const [lastPacket, setLastPacket] = useState<Date | null>(null)
  const [animated, setAnimated] = useState<boolean | null>(false)
  const lastPacketRef = useRef(lastPacket)
  lastPacketRef.current = lastPacket

  useEffect(() => {
    // We use window.setTimeout later, due to @types/node setTimeout types
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

    const listener = (msg: StorageEventPartial) => {
      if (
        msg.key &&
        msg.newValue &&
        msg.key === 'monetizedTotal' &&
        JSON.parse(msg.newValue) > 0
      ) {
        setLastPacket(new Date())
        setAnimated(true)
        if (!animateTimeout) {
          window.setTimeout(loopHandler, ANIMATION_INTERVAL)
        }
      }
    }
    host.events.on('storage', listener)
    return () => {
      host.events.removeListener('storage', listener)
      if (animateTimeout != null) {
        window.clearTimeout(animateTimeout)
      }
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
