import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'

import { StatusButton } from './StatusButton'
import { StatusTypography } from './util/StatusTypography'

const titleString = 'Get a subscription'
const subheading1 = 'To use Coil you need an active subscription'
const footerString =
  'You can cancel your subscription any time in the account settings page.'

const Muted = styled.p`
  color: ${Colors.Grey500};
  font-size: 12px;
  font-weight: 550;
`

export const Unsubscribed = (props: PopupProps) => {
  const {
    context: {
      coilDomain,
      runtime: { tabOpener }
    }
  } = props
  const onClick = tabOpener(coilDomain + '/settings/payment')

  return (
    <Grid container justify='center' alignItems='center'>
      <div>
        <StatusTypography variant='h6' align='center'>
          {titleString}
        </StatusTypography>
        <StatusTypography variant='subtitle1' align='center'>
          {subheading1}
        </StatusTypography>
        <StatusButton text='Subscribe' variant='contained' onClick={onClick} />
        <Muted>{footerString}</Muted>
      </div>
    </Grid>
  )
}
