import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { Typography, styled, Theme, useTheme, Box } from '@material-ui/core'

import { useHost } from '../../context/popupHostContext'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { CtaButton } from '../CtaButton'
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
export const StreamingNoMembershipView = () => {
  const theme = useTheme()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()
  const lottieAnchor = useRef(null)

  const onClick = tabOpener(coilDomain + '/settings/payment')

  useEffect(() => {
    if (lottieAnchor.current) {
      // normally we would use this.streamingPaused = lootie
      // but compiler is throwing error "this Object is possibly undefined", which is not possible: https://github.com/microsoft/TypeScript/issues/15385

      const streamingPaused = lottie.loadAnimation({
        container: lottieAnchor.current,
        animationData: streamingOnAnimation,
        autoplay: false
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
        Support this content
      </Typography>
      <Box flex='1'>
        <Typography variant='subtitle1' align='center'>
          Get a $5/mo Coil membership to
          <br />
          support content and creators you love
        </Typography>
      </Box>
      <Box mt={2} mb={1} px={3}>
        <CtaButton onClick={onClick}>Become a member</CtaButton>
      </Box>
    </NewHeaderFooterLayout>
  )
}
