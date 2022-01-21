import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'

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

  useEffect(() => {
    const playAnimation = monetizedTotal !== 0 && monetizedTotal !== null
    if (lottieAnchor.current) {
      lottie.loadAnimation({
        container: lottieAnchor.current,
        animationData: streamingOnAnimation,
        autoplay: playAnimation
      })
    }
  }, [lottieAnchor])

  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
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
