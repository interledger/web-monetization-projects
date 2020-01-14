import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'

import { StatusButton } from './StatusButton'
import { StatusTypography } from './util/StatusTypography'

const titleString = 'Become a member'
const subheading1 = 'To use Coil you need an active membership'
const footerString =
  'You can cancel your membership any time in the account settings page.'

const Muted = styled('p')({
  color: Colors.Grey500,
  fontSize: '12px',
  fontWeight: 600
})

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
        <StatusButton text='join' variant='contained' onClick={onClick} />
        <Muted>{footerString}</Muted>
      </div>
    </Grid>
  )
}
