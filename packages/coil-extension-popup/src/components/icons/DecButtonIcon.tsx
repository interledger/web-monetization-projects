import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

type SvgIconComponent = typeof SvgIcon

export const DecButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
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
          y='11'
          width='10'
          height='2.5'
          rx='1.25'
          fill={props.htmlColor}
        />
      </svg>
    </SvgIcon>
  )
}
