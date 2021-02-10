import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { formatAmount } from '../../util/currencyFormatting'

import { TipAddButton } from './TipAddButton'
import { TipSubButton } from './TipSubButton'

export interface TipCounterProps {
  tipAmount: number
  increase: () => void
  decrease: () => void
  max: number
  min: number
}

const BigBalance = styled('p')(() => ({
  fontSize: '56px',
  lineHeight: '64px',
  margin: '0px',
  flex: 1,
  color: Colors.Grey800,
  // userSelect: 'none',
  cursor: 'default'
}))

const Flex = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexAlign: 'center',
  height: '80px',
  width: '212px',
  margin: '0 auto'
}))

const TipButtonWrap = styled('div')(() => ({
  display: 'flex',
  width: '36px',
  textAlign: 'center',
  paddingTop: '14px'
}))

export const TipCounter = (props: TipCounterProps) => {
  const formattedAmount = formatAmount(
    {
      amount: String(props.tipAmount),
      assetCode: 'USD',
      assetScale: 2
    },
    { precision: 0 }
  )

  return (
    <Flex>
      <TipButtonWrap>
        <TipSubButton
          onClick={props.decrease}
          limited={props.tipAmount == props.min}
          tipAmount={formattedAmount}
        />
      </TipButtonWrap>
      <BigBalance>{formattedAmount}</BigBalance>
      <TipButtonWrap>
        <TipAddButton
          onClick={props.increase}
          limited={props.tipAmount == props.max}
          tipAmount={formattedAmount}
        />
      </TipButtonWrap>
    </Flex>
  )
}
