import React, { Fragment, useEffect, useState } from 'react'
import { Grid, styled } from '@material-ui/core'

import { PopupProps } from '../types'

import { Link } from './util/Link'
import { StatusTypography } from './util/StatusTypography'
import { MonetizeAnimation } from './MonetizationAnimation'
import { StreamControls } from './StreamControls'
import { TipButton } from './TipButton'
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
  const [limitRefreshDate, setLimitRefreshDate] = useState<string | null>(null)
  const [showControls, onClick] = useShowIfClicked({
    clicksRequired: 9,
    withinMs: 5000,
    key: 'showStreamingControls'
  })

  useEffect(() => {
    props.context.runtime.sendMessage(
      {
        command: 'isRateLimited'
      },
      result => {
        if (result && result.limitExceeded) {
          const date = new Date(result.limitRefreshDate)
          const formatted = date.toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
          setLimitRefreshDate(formatted)
        }
      }
    )
  }, [])
  const context = props.context
  return (
    <>
      <Grid container alignItems='center' justify='center'>
        <div>
          {limitRefreshDate != null ? (
            <RateLimited
              context={context}
              limitRefreshDate={limitRefreshDate}
            />
          ) : (
            <div onClick={onClick}>
              <Donating context={context} />
            </div>
          )}
        </div>
      </Grid>
      {showControls && <StreamControls context={context} />}

      {/* this will only show if user is enabled */}
      <TipButton context={context} />
    </>
  )
}

function Donating(props: PopupProps) {
  const { monetizedTotal, adapted } = props.context.store
  const paymentStarted = monetizedTotal !== 0

  return (
    <Fragment>
      <StatusTypography variant='h6' align='center'>
        Thanks for your support
      </StatusTypography>
      <StatusTypography variant='subtitle1' align='center'>
        {adapted
          ? 'Your Coil Membership supports this creator while you are enjoying their content.'
          : 'Your Coil Membership supports this site while you are enjoying its content.'}
        {!paymentStarted && 'Setting up payment.'}
      </StatusTypography>
      <FlexBox>
        <MonetizeAnimation context={props.context} />
      </FlexBox>
    </Fragment>
  )
}

function RateLimited(props: PopupProps & { limitRefreshDate: string }) {
  const {
    context: {
      coilDomain,
      runtime: { tabOpener }
    },
    limitRefreshDate
  } = props
  const mailOpener = tabOpener('mailto:accountreview@coil.com')
  const termsOpener = tabOpener(`${coilDomain}/terms`)

  return (
    <Fragment>
      <StatusTypography variant='h6' align='center'>
        Important Notice
      </StatusTypography>

      <StatusTypography variant='body1' align='left'>
        Your usage might be in violation of our
        <Link onClick={termsOpener} target='_blank'>
          {' '}
          Terms of Service
        </Link>
        , which prohibit:
      </StatusTypography>

      <StatusTypography variant='body1' align='left'>
        <ul>
          <li>Long-term idling on websites</li>
          <li>Participating in a scheme to direct funds to yourself</li>
        </ul>
      </StatusTypography>

      <StatusTypography variant='body1' align='left'>
        If you believe you are receiving this message in error, please reach out
        to
        <Link onClick={mailOpener} target='_blank'>
          {' '}
          accountreview@coil.com
        </Link>
      </StatusTypography>

      <StatusTypography variant='body1' align='left'>
        Your membership is still active. Your usage will be restored on{' '}
        {limitRefreshDate}. Please adhere to the Terms of Service in the future.
      </StatusTypography>
    </Fragment>
  )
}
