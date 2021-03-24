import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { PopupProps } from '../../types'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusTypography } from '../util/StatusTypography'
import { MonetizeAnimation } from '../MonetizationAnimation'
import { StreamControls } from '../StreamControls'
import { TipButton } from '../TipButton'
import { useShowIfClicked } from '../util/useShowIfClicked'


//
// Styles
//
const FlexBox = styled('div')(({ theme }) => ({
  marginTop: `${theme.spacing(2)}px`,
  marginBottom: `${theme.spacing(2)}px`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%'
}))

//
// Component
//
export const MonetizedDonatingView = (props: PopupProps) => {
    const context = props.context
    const { monetizedTotal, adapted } = props.context.store
    const paymentStarted = monetizedTotal !== 0
    const emptyWhenNotAdapted = adapted ? 'Coil is paying the creator.' : ''
    const payingOrSettingUpPayment = paymentStarted
      ? emptyWhenNotAdapted
      : 'Setting up payment.'
  
    const [showControls, onClick] = useShowIfClicked({
        clicksRequired: 9,
        withinMs: 5000,
        key: 'showStreamingControls'
    })

    return (
        <HeaderFooterLayout context={context}>
            <Grid container alignItems='center' justify='center'>
                <div onClick={onClick}>
                    <StatusTypography variant='h6' align='center'>
                        Coil is paying
                    </StatusTypography>
                    <StatusTypography variant='subtitle1' align='center'>
                        This content is included in your membership. {payingOrSettingUpPayment}
                    </StatusTypography>
                    <FlexBox>
                        <MonetizeAnimation context={context} />
                    </FlexBox>
                </div>
            </Grid>
            {showControls && <StreamControls context={context} />}

            {/* this will only show if user is enabled */}
            <TipButton context={context} />
        </HeaderFooterLayout>
    )
}