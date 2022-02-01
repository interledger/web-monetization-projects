import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { useStore } from '../context/storeContext'
import { useTip } from '../context/tipContext'

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
export const TipWarning = (): React.ReactElement => {
  const { user } = useStore()
  const { limitRemainingAmountUsd = 0 } = user?.tipSettings || {}
  const { currentTipAmountUsd } = useTip()

  return (
    <WarningWrapper>
      {currentTipAmountUsd >= limitRemainingAmountUsd ? (
        <span>
          <a
            href='https://coil.com/settings/tipping'
            target='_blank'
            rel='noreferrer'
          >
            Increase daily tipping limit
          </a>
        </span>
      ) : null}
    </WarningWrapper>
  )
}
