import React, { Fragment } from 'react'
import { Grid, styled } from '@material-ui/core'

import { PopupProps } from '../types'

import { StatusTypography } from './util/StatusTypography'
import { MonetizeAnimation } from './MonetizationAnimation'
import { StreamControls } from './StreamControls'
import { TipControl } from './TipControl'
import { CoilContainer } from './CoilContainer'
import { useShowIfClicked } from './util/useShowIfClicked'

const FlexBox = styled('div')(({ theme }) => ({
  marginTop: `${theme.spacing(2)}px`,
  marginBottom: `${theme.spacing(2)}px`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%'
}))

export function MonetizedPage(props: PopupProps) {
  const [showControls, onClick] = useShowIfClicked({
    clicksRequired: 9,
    withinMs: 5000,
    key: 'showStreamingControls'
  })

  const context = props.context
  return (
    <>
      <CoilContainer>
        <Grid container alignItems='center' justify='center'>
          <div onClick={onClick}>
            <Donating context={context} />
          </div>
        </Grid>

        {showControls && <StreamControls context={context} />}
      </CoilContainer>
      {/* this will only show if user is enabled */}
      <TipControl context={context} />
    </>
  )
}

function Donating(props: PopupProps) {
  const { monetizedTotal, adapted } = props.context.store
  const paymentStarted = monetizedTotal !== 0
  const emptyWhenNotAdapted = adapted ? 'Coil is paying the creator.' : ''
  const payingOrSettingUpPayment = paymentStarted
    ? emptyWhenNotAdapted
    : 'Setting up payment.'

  return (
    <Fragment>
      <StatusTypography variant='h6' align='center'>
        Coil is paying
      </StatusTypography>
      <StatusTypography variant='subtitle1' align='center'>
        This content is included in your membership. {payingOrSettingUpPayment}
      </StatusTypography>
      <FlexBox>
        <MonetizeAnimation context={props.context} />
      </FlexBox>
    </Fragment>
  )
}
