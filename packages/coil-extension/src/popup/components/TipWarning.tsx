import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'

//
// Styles
//
const WarningWrapper = styled('div')({
  color: Colors.Red700,
  textAlign: 'center',
  fontWeight: 'normal',
  height: '22px',
  '& a': {
    color: Colors.Red700,
    fontWeight: 'normal'
  }
})

//
// Component
//
export const TipWarning = (props: {
  currentTipAmount: number
}): React.ReactElement => {
  const { currentTipAmount } = props

  const maximumTipLimit = 100 //! needs to be replaced with data from an api call to users settings
  const getRemainingDailyAmountAllowed = () => 100 //! needs to be replaced with data from an api call to users settings

  //todo - update link once billing infrastructure is complete and we have a view for changing the limit
  return (
    <WarningWrapper>
      {currentTipAmount >= getRemainingDailyAmountAllowed() ? (
        <span>
          <a href='https://coil.com/settings/account'>
            Increase daily tipping limit
          </a>
        </span>
      ) : currentTipAmount == maximumTipLimit ? (
        <span>Maximum amount for tip</span>
      ) : null}
    </WarningWrapper>
  )
}
