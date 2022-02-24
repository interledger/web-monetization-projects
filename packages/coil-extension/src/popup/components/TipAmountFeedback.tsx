import React from 'react'
import { Box, Typography, styled, Theme } from '@material-ui/core'

import { useTip } from '../context/tipContext'
import { useStore } from '../context/storeContext'
import { useHost } from '../context/popupHostContext'
import { getCreditCardFromPaymentMethods } from '../../util/getCreditCardFromPaymentMethods'

import { LinkUnderlined } from './LinkUnderlined'

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
  const { currentTipAmountUsd, maxAllowableTipAmountUsd } = useTip()
  const { user } = useStore()
  const {
    tippingBetaFeatureFlag,
    paymentMethods,
    tipSettings: {
      limitRemainingAmountUsd = 0,
      totalTipCreditAmountUsd = 0,
      minTipLimitAmountUsd = 1
    } = {}
  } = user ?? {}
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const creditCard = getCreditCardFromPaymentMethods(paymentMethods)

  const getRestrictedMessage = () => {
    // this handles the specific case of the daily limit remaining being zeroed out
    if (limitRemainingAmountUsd == 0) {
      return (
        <Typography variant='subtitle1'>
          Daily limit reached.{' '}
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/tipping`)}>
            Raise limit
          </LinkUnderlined>
        </Typography>
      )
    }
    if (currentTipAmountUsd >= limitRemainingAmountUsd) {
      return (
        <Typography variant='subtitle1'>
          Max tip amount.{' '}
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/tipping`)}>
            Raise limit
          </LinkUnderlined>
        </Typography>
      )
    }
    if (
      currentTipAmountUsd >= totalTipCreditAmountUsd &&
      tippingBetaFeatureFlag &&
      !creditCard
    ) {
      return (
        <Typography variant='subtitle1'>
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/billing`)}>
            Add credit card to tip more
          </LinkUnderlined>
        </Typography>
      )
    }
    // this should only hit if we are allowing fractional amounts and the max tip is less than $1 or the minimum
    // TODO: need to segment if the max is due to tip credits or daily limit
    if (maxAllowableTipAmountUsd < minTipLimitAmountUsd) {
      return (
        <Typography variant='subtitle1'>
          Limit below minimum tip.{' '}
          <LinkUnderlined onClick={tabOpener(`${coilDomain}/settings/tipping`)}>
            Raise limit
          </LinkUnderlined>
        </Typography>
      )
    }
    return null
  }

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
      <Box>{getRestrictedMessage()}</Box>
    </Box>
  )
}
