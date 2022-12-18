import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

type SvgIconComponent = typeof SvgIcon

export const CreditCardPlaceholder: SvgIconComponent = (
  props: SvgIconProps
) => {
  return (
    <SvgIcon viewBox='0 0 24 16' {...props}>
      <rect width='24' height='16' rx='2' fill='#E3E5E9' />
      <rect
        x='3.69238'
        y='3.55566'
        width='6.46154'
        height='3.55556'
        rx='1'
        fill='white'
      />
      <rect
        x='3.69238'
        y='10.6665'
        width='3.69231'
        height='1.77778'
        rx='0.888889'
        fill='#BCBCBC'
      />
      <rect
        x='8.30762'
        y='10.6665'
        width='3.69231'
        height='1.77778'
        rx='0.888889'
        fill='#BCBCBC'
      />
      <rect
        x='12.9229'
        y='10.6665'
        width='3.69231'
        height='1.77778'
        rx='0.888889'
        fill='#BCBCBC'
      />
      <path
        d='M17.5381 11.5554C17.5381 11.0645 17.9361 10.6665 18.427 10.6665H20.3415C20.8324 10.6665 21.2304 11.0645 21.2304 11.5554C21.2304 12.0463 20.8324 12.4443 20.3415 12.4443H18.427C17.9361 12.4443 17.5381 12.0463 17.5381 11.5554Z'
        fill='#BCBCBC'
      />
    </SvgIcon>
  )
}
