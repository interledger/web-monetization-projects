import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'

interface TipAddButtonProps {
  onClick: () => any
  limited: boolean
  tipAmount: string
}

const Wrapper = styled('div')(() => ({
  width: '60px',
  display: 'block'
}))

const Message = styled('p')(() => ({
  fontFamily: 'Circular Std',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: Colors.Red400,
  margin: '0 0 0 -10px',
  position: 'absolute',
  width: '60px'
}))

export const TipAddButton = ({
  onClick,
  limited,
  tipAmount
}: TipAddButtonProps) => {
  return (
    <Wrapper onMouseDown={e => e.preventDefault()} onClick={onClick}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='20'
          cy='20'
          r='20'
          fill={limited ? Colors.Red50 : Colors.Grey89}
        />
        <rect
          x='12'
          y='18'
          width='16'
          height='4'
          rx='2'
          fill={limited ? Colors.Red400 : Colors.Grey700}
        />
        <rect
          x='22'
          y='12'
          width='16'
          height='4'
          rx='2'
          transform='rotate(90 22 12)'
          fill={limited ? Colors.Red400 : Colors.Grey700}
        />
      </svg>
      <Message style={{ display: limited ? 'block' : 'none' }}>
        Max {tipAmount}
      </Message>
    </Wrapper>
  )
}
