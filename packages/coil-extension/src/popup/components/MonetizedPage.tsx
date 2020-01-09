import React, { Fragment, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

import { PopupProps } from '../types'

import { Link } from './util/Link'
import { StatusTypography } from './util/StatusTypography'
import { MonetizeAnimation } from './MonetizationAnimation'
import { StreamControls } from './StreamControls'
import { useShowIfClicked } from './util/useShowIfClicked'

const FlexBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const SpacerImg = styled.img`
  flex: 1;
`

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
    </>
  )
}

function Donating(props: PopupProps) {
  const { monetizedTotal, error } = props.context.store
  const onTimeIsClicked = props.context.runtime.tabOpener('https://time.is')

  const paymentStarted = monetizedTotal !== 0
  // eslint-disable-next-line no-nested-ternary
  const message = error
    ? null
    : paymentStarted
    ? 'Coil is paying the creator.'
    : 'Setting up payment.'

  return (
    <Fragment>
      <StatusTypography variant='h6' align='center'>
        {!error ? 'Coil is paying' : 'Error paying'}
      </StatusTypography>
      {!error && (
        <StatusTypography variant='subtitle1' align='center'>
          This content is included in your subscription. {message}
        </StatusTypography>
      )}
      {error && (
        <StatusTypography variant='subtitle1' align='center'>
          {error.message}
          {error.type === 'clock_skew' && (
            <p>
              Please go to {/* "href" while unused gives the click underline */}
              <a href='https://time.is' onClick={onTimeIsClicked}>
                time.is
              </a>
              , sync your clock and refresh the page.
            </p>
          )}
        </StatusTypography>
      )}
      {!error && (
        <FlexBox>
          <MonetizeAnimation context={props.context} />
        </FlexBox>
      )}
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
        Your subscription is still active. Your usage will be restored on{' '}
        {limitRefreshDate}, when your subscription renews. Please adhere to the
        Terms of Service in the future.
      </StatusTypography>
    </Fragment>
  )
}
