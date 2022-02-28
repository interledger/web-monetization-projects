import React from 'react'
import { Box, Typography, styled, Theme } from '@material-ui/core'

import { useStore } from '../../context/storeContext'

import { RestrictedMessage } from './RestrictedMessage'

//
// Styles
//
const ChargeAmount = styled('strong')(
  ({ theme, iszero }: { theme: Theme; iszero?: boolean }) => ({
    color: iszero ? theme.palette.Grey200 : theme.palette.Grey800
  })
)

//
// Component
//
export const TipAmountFeedback = () => {
  const { user } = useStore()
  const { tipSettings: { totalTipCreditAmountUsd = 0 } = {} } = user ?? {}

  // This formatting is here in case we choose to start allowing fractional amounts later on
  const formattedTipCreditAmountUsd = Number.isInteger(totalTipCreditAmountUsd)
    ? totalTipCreditAmountUsd
    : totalTipCreditAmountUsd.toFixed(2)

  return (
    <Box textAlign='center'>
      <Box>
        <Typography variant='subtitle1'>
          Available tip credits:{' '}
          <ChargeAmount iszero={totalTipCreditAmountUsd == 0}>
            ${formattedTipCreditAmountUsd}
          </ChargeAmount>
        </Typography>
      </Box>
      <Box>
        <RestrictedMessage />
      </Box>
    </Box>
  )
}
