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
    // handles the specific case of the daily limit being zeroed out on open
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
    // handles the case where the user maxes out their daily limit during input
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
    // handles the case where the user has run out of tip credits but is allowed to add a credit card
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
    //
    // this should only hit if we are allowing fractional amounts and the max tip is less than $1 or the minimum
    //
    if (maxAllowableTipAmountUsd < minTipLimitAmountUsd) {
      if (maxAllowableTipAmountUsd === limitRemainingAmountUsd) {
        // max amount is set at the daily limit
        return (
          <Typography variant='subtitle1'>
            Limit below minimum tip.{' '}
            <LinkUnderlined
              onClick={tabOpener(`${coilDomain}/settings/tipping`)}
            >
              Raise limit
            </LinkUnderlined>
          </Typography>
        )
      } else {
        // max amount is set by tip credits
        if (tippingBetaFeatureFlag && !creditCard) {
          // user is in beta -> return add credit card
          return (
            <Typography variant='subtitle1'>
              <LinkUnderlined
                onClick={tabOpener(`${coilDomain}/settings/billing`)}
              >
                Add credit card to tip minimum amount.
              </LinkUnderlined>
            </Typography>
          )
        } else {
          // user not in beta -> not enough credits  minimum
          return (
            <Typography variant='subtitle1'>
              Credits below minimum tip amount.
            </Typography>
          )
        }
      }
    }
    // don't show a message if the user has not input a min or max
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
