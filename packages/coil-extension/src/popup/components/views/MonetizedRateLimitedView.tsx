import React from 'react'
import { Grid } from '@material-ui/core'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { Link } from '../util/Link'
import { StatusTypography } from '../util/StatusTypography'
import { StreamControls } from '../StreamControls'
import { TipButton } from '../TipButton'
import { useShowIfClicked } from '../util/useShowIfClicked'
import { useHost } from '../../context/popupHostContext'

//
// Component
//
export const MonetizedRateLimitedView = (props: {
  limitRefreshDate: string | null
}) => {
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()
  const { limitRefreshDate } = props

  const [showControls, onClick] = useShowIfClicked({
    clicksRequired: 9,
    withinMs: 5000,
    key: 'showStreamingControls'
  })
  const mailOpener = tabOpener('mailto:accountreview@coil.com')
  const termsOpener = tabOpener(`${coilDomain}/terms`)

  return (
    <HeaderFooterLayout>
      <Grid container alignItems='center' justify='center'>
        <div>
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
            If you believe you are receiving this message in error, please reach
            out to
            <Link onClick={mailOpener} target='_blank'>
              {' '}
              accountreview@coil.com
            </Link>
          </StatusTypography>

          <StatusTypography variant='body1' align='left'>
            Your membership is still active. Your usage will be restored on{' '}
            {limitRefreshDate}. Please adhere to the Terms of Service in the
            future.
          </StatusTypography>
        </div>
      </Grid>
      {showControls && <StreamControls />}

      {/* this will only show if user is enabled */}
      <TipButton />
    </HeaderFooterLayout>
  )
}
