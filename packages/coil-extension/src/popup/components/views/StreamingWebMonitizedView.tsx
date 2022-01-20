import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import streamingOnAnimation from '../lottie-animations/wm_streaming_on.json'

//
// Styles
//
const LottieWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
  height: 'auto',
  width: '196px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

//
// Component
//
export const StreamingWebMonetizedView = () => {
  const theme = useTheme()
  const lottieAnchor = useRef(null)

  useEffect(() => {
    this.streamingOn = lottie.loadAnimation({
      container: lottieAnchor.current,
      animationData: streamingOnAnimation,
      autoplay: true
    })
  }, [])

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
        Your Coil Membership streams
        <br />
        payments to this site while you&apos;re on it
      </Typography>
    </NewHeaderFooterLayout>
  )
}
