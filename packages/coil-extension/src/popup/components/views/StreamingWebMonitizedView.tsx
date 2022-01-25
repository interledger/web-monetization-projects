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
  const { monetizedTotal } = useStore()
  const lottieAnchor = useRef(null)

  useEffect(() => {
    if (lottieAnchor.current) {
      // normally we would use this.streamingOn = lootie
      // but compiler is throwing error "this Object is possibly undefined", which is not possible: https://github.com/microsoft/TypeScript/issues/15385

      const streamingOn = lottie.loadAnimation({
        container: lottieAnchor.current,
        animationData: streamingOnAnimation,
        autoplay: monetizedTotal !== 0
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
        Your Coil Membership streams
        <br />
        payments to this site while you&apos;re on it
      </Typography>
    </NewHeaderFooterLayout>
  )
}
