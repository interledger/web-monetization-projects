import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusTypography } from '../util/StatusTypography'
import { MonetizeAnimation } from '../MonetizationAnimation'
import { StreamControls } from '../StreamControls'
import { TipButton } from '../TipButton'
import { useShowIfClicked } from '../util/useShowIfClicked'
import { useStore } from '../../context/storeContext'

//
// Styles
//
const FlexBox = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%'
}))

//
// Component
//
export const MonetizedDonatingView = () => {
  const { monetizedTotal, adapted } = useStore()
  const paymentStarted = monetizedTotal !== 0

  const [showControls, onClick] = useShowIfClicked({
    clicksRequired: 9,
    withinMs: 5000,
    key: 'showStreamingControls'
  })

  return (
    <HeaderFooterLayout>
      <Grid container alignItems='center' justify='center'>
        <div onClick={onClick}>
          <StatusTypography variant='h6' align='center'>
            Thanks for your support
          </StatusTypography>
          <StatusTypography variant='subtitle1' align='center'>
            {adapted
              ? 'Your Coil Membership supports this creator while you are enjoying their content.'
              : 'Your Coil Membership supports this site while you are enjoying its content.'}
            {!paymentStarted && ' Setting up payment.'}
          </StatusTypography>
          <FlexBox>
            <MonetizeAnimation />
          </FlexBox>
        </div>
      </Grid>
      {showControls && <StreamControls />}

      {/* this will only show if user is enabled */}
      <TipButton />
    </HeaderFooterLayout>
  )
}
