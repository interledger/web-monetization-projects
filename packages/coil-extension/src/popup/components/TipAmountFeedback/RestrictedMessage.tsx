import React from 'react'
import { Typography } from '@material-ui/core'

import { useTip } from '../../context/tipContext'
import { useStore } from '../../context/storeContext'
import { useHost } from '../../context/popupHostContext'
import { getCreditCardFromPaymentMethods } from '../../../util/getCreditCardFromPaymentMethods'
import { LinkUnderlined } from '../LinkUnderlined'

//
// Component
//
export const RestrictedMessage = () => {
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

  if (maxAllowableTipAmountUsd >= minTipLimitAmountUsd) {
    //
    // Max is still above the minimum tip limit
    //

    // handles the case where the user maxes out their daily limit during input
    if (currentTipAmountUsd >= limitRemainingAmountUsd) {
      return (
        <Typography variant='subtitle1'>
          Max tip amount.{' '}
          <LinkUnderlined
            tabIndex={0}
            onKeyPress={tabOpener(`${coilDomain}/settings/tipping`)}
            onClick={tabOpener(`${coilDomain}/settings/tipping`)}
          >
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
          <LinkUnderlined
            tabIndex='0'
            onKeyPress={tabOpener(`${coilDomain}/settings/billing`)}
            onClick={tabOpener(`${coilDomain}/settings/billing`)}
          >
            Add credit card to tip more
          </LinkUnderlined>
        </Typography>
      )
    }
  } else {
    //
    // Max is below the minimum tip limit
    //

    // handles the specific case of the daily limit being zeroed out on open
    if (limitRemainingAmountUsd == 0) {
      return (
        <Typography variant='subtitle1'>
          Daily limit reached.{' '}
          <LinkUnderlined
            tabIndex='0'
            onKeyPress={tabOpener(`${coilDomain}/settings/tipping`)}
            onClick={tabOpener(`${coilDomain}/settings/tipping`)}
          >
            Raise limit
          </LinkUnderlined>
        </Typography>
      )
    }
    // handles instances where there is most likely a fractional amount
    if (maxAllowableTipAmountUsd === limitRemainingAmountUsd) {
      // max amount is set at the daily limit
      return (
        <Typography variant='subtitle1'>
          Limit below minimum tip.{' '}
          <LinkUnderlined
            tabIndex='0'
            onKeyPress={tabOpener(`${coilDomain}/settings/tipping`)}
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
              tabIndex='0'
              onKeyPress={tabOpener(`${coilDomain}/settings/billing`)}
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
