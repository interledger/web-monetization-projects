import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

type SvgIconComponent = typeof SvgIcon

export const IncButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
  return (
    <SvgIcon>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='7'
          y='10.75'
          width='10'
          height='2.5'
          rx='1.25'
          fill={props.htmlColor}
        />
        <rect
          x='13.2499'
          y='7'
          width='10'
          height='2.5'
          rx='1.25'
          transform='rotate(90 13.2499 7)'
          fill={props.htmlColor}
        />
      </svg>
    </SvgIcon>
  )
}
