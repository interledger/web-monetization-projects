import React from 'react'
import { Box, Typography, styled, Theme } from '@material-ui/core'

import { useTip } from '../context/tipContext'
import { useStore } from '../context/storeContext'
import { useHost } from '../context/popupHostContext'

import { LinkUnderlined } from './LinkUnderlined'

//
// Styles
//
const ChargeAmount = styled('strong')(
  ({ theme, isZero }: { theme: Theme; isZero?: boolean }) => ({
    color: isZero ? theme.palette.Grey200 : theme.palette.Grey800
  })
)

//
// Component
//
export const TipAmountFeedback = () => {
  const { currentTipAmount } = useTip()
  const { user } = useStore()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const tipCredits = 2
  const inTippingBeta = false
  const hasCreditCard = false
  const remainingDailyLimit = 4

  const getChargeAmountDisplay = () => {
    let charge = tipCredits - currentTipAmount
    let chargeDisplay = 'Tip credits:'

    // for amounts greater than the available tip credits require that the user is
    // also in the beta and has a credit card on file
    if (currentTipAmount > tipCredits && inTippingBeta && hasCreditCard) {
      charge = currentTipAmount - tipCredits
      chargeDisplay = 'Credit card charge:'
    }
    charge = charge < 0 ? 0 : charge
    return (
      <Typography variant='subtitle1'>
        {chargeDisplay}{' '}
        <ChargeAmount isZero={charge == 0}>${charge.toFixed(2)}</ChargeAmount>
      </Typography>
    )
  }

  const getRestrictedMessage = () => {
    let prompt = null
    if (currentTipAmount >= remainingDailyLimit) {
      prompt = (
        <Typography variant='subtitle1'>
          Daily limit reached.{' '}
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/tipping`)}>
            Raise limit
          </LinkUnderlined>
        </Typography>
      )
    }
    if (currentTipAmount >= tipCredits && inTippingBeta && !hasCreditCard) {
      prompt = (
        <Typography variant='subtitle1'>
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/billing`)}>
            Add credit card to tip more
          </LinkUnderlined>
        </Typography>
      )
    }
    return prompt
  }

  return (
    <Box textAlign='center'>
      <Box>{getChargeAmountDisplay()}</Box>
      <Box>{getRestrictedMessage()}</Box>
    </Box>
  )
}
