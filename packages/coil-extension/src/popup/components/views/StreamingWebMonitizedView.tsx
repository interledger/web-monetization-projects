import React, { useEffect, useRef, useState } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import { styled, Theme, Typography, useTheme } from '@material-ui/core'

import { useStore } from '../../context/storeContext'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import streamingOnAnimation from '../lottie-animations/wm_streaming_on.json'

//
// Styles
//
const LottieWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
  height: '152px',
  width: '196px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

//
// Component
//
export const StreamingWebMonetizedView = () => {
  const theme = useTheme()
  const { monetizedTotal, adapted } = useStore()

  const lottieAnchor = useRef(null)
  const [lastPacket, setLastPacket] = useState(0)
  const [now, setNow] = useState(Date.now())
  const [loaded, setLoaded] = useState(false)
  const [lottieAnim, setLottieAnim] = useState<null | AnimationItem>(null)
  const playAnimation =
    typeof monetizedTotal === 'number' &&
    monetizedTotal > 0 &&
    now - lastPacket <= 5e3

  // Update `now` every second so that recent packet check works
  useEffect(() => {
    const handle = window.setInterval(() => {
      setNow(Date.now())
    }, 1e3)
    return () => {
      window.clearInterval(handle)
    }
  })

  // Set the lastPacket time whenever monetized total changes
  useEffect(() => {
    if (monetizedTotal && monetizedTotal > 0) {
      setLastPacket(Date.now())
    }
  }, [monetizedTotal])

  // Load the lottie-web animation item
  useEffect(() => {
    if (lottieAnchor.current && !loaded) {
      setLottieAnim(
        lottie.loadAnimation({
          container: lottieAnchor.current,
          animationData: streamingOnAnimation
        })
      )
      setLoaded(true)
    }
  }, [lottieAnchor, loaded])

  // Set the play or stopped state
  useEffect(() => {
    if (loaded && lottieAnim /* appease T.S. */) {
      if (playAnimation) {
        lottieAnim.play()
      } else {
        lottieAnim.stop()
      }
    }
  }, [loaded, playAnimation])

  // site message is for standard web monetized sites
  const siteMessage = (
    <>
      Your Coil Membership streams
      <br />
      payments to this site while you&apos;re on it
    </>
  )
  // content message is for web applications like twitch and youtube where the creator has web monetized their specific content
  const contentMessage = (
    <>
      Your Coil Membership supports this
      <br />
      creator while you enjoy their content
    </>
  )

  return (
    <NewHeaderFooterLayout title='Stream Payments'>
      <LottieWrapper ref={lottieAnchor} />
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Thank You!
      </Typography>
      <Typography variant='subtitle1' align='center'>
        {adapted ? contentMessage : siteMessage}
      </Typography>
    </NewHeaderFooterLayout>
  )
}
