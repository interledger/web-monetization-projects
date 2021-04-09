import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { useHost } from '../context/popupHostContext'

import { StatusTypography } from './util/StatusTypography'
import { StatusButton } from './StatusButton'

const UnverifiedFooter = styled('div')(({ theme }) => ({
  paddingRight: `${theme.spacing(2)}px`,
  paddingLeft: `${theme.spacing(2)}px`,
  position: 'absolute',
  bottom: `${theme.spacing(4)}vh`,
  left: 0,
  right: 0,
  margin: 'auto'
}))

const NoBreak = styled('span')({
  display: 'inline-block',
  whiteSpace: 'nowrap'
})

const titleString = 'Verify your account'
const subheading1 =
  'To validate your account and reserve a spot on our waitlist please enter your credit card information.'

export const Unverified = () => {
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()
  const onClick = tabOpener(coilDomain + '/card-validation')

  return (
    <Grid container justify='center' alignItems='center'>
      <div>
        {/* title */}
        <StatusTypography variant='subtitle2' align='center'>
          <NoBreak>{titleString}</NoBreak>
        </StatusTypography>
        <StatusTypography variant='subtitle1' align='center'>
          {subheading1}
        </StatusTypography>
        <StatusButton
          onClick={onClick}
          text='Verify account'
          variant='contained'
        />
      </div>
    </Grid>
  )
}
