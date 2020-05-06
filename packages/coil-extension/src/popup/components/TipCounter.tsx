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
  width: '60%',
  color: Colors.Grey800,
  userSelect: 'none',
  cursor: 'default'
}))

const Flex = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexAlign: 'center'
}))

const TipSubButtonWrap = styled('div')(() => ({
  display: 'flex',
  width: '20%',
  paddingTop: '14px'
}))

export const TipCounter = (props: TipCounterProps) => {
  const formattedAmount = formatAmount({
    amount: String(props.tipAmount),
    assetCode: 'USD',
    assetScale: 2
  })

  return (
    <Flex>
      <TipSubButtonWrap>
        <TipSubButton
          onClick={props.decrease}
          limited={props.tipAmount == props.min}
          tipAmount={formattedAmount}
        />
      </TipSubButtonWrap>
      <BigBalance>{formattedAmount}</BigBalance>
      <TipSubButtonWrap>
        <TipAddButton
          onClick={props.increase}
          limited={props.tipAmount == props.max}
          tipAmount={formattedAmount}
        />
      </TipSubButtonWrap>
    </Flex>
  )
}
