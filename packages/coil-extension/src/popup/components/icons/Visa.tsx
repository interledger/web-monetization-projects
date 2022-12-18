import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

type SvgIconComponent = typeof SvgIcon

export const Visa: SvgIconComponent = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 125.43 78.39' {...props}>
      <defs>
        <style>{'.cls-2{fill:#fff}'}</style>
      </defs>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='Layer_1-2' data-name='Layer 1'>
          <rect width='125.43' height='78.39' rx='4.18' fill='#3957a7' />
          <path
            className='cls-2'
            d='M57.72 50.97h-6.13l3.83-23.53h6.13l-3.83 23.53zM46.44 27.44L40.6 43.62l-.69-3.48-2.06-10.58a2.63 2.63 0 00-2.91-2.12h-9.66l-.11.4a22.81 22.81 0 016.41 2.69L36.9 51h6.39L53 27.44zM94.63 51h5.63l-4.9-23.53h-4.93a2.81 2.81 0 00-2.83 1.75L78.46 51h6.39l1.27-3.49h7.8zm-6.74-8.32l3.22-8.81 1.81 8.81zM78.94 33.1l.87-5.1a17.71 17.71 0 00-5.51-1C71.26 27 64 28.35 64 34.81c0 6.08 8.48 6.15 8.48 9.35s-7.6 2.62-10.11.6l-.91 5.29a17.11 17.11 0 006.91 1.33c4.18 0 10.49-2.17 10.49-8.06 0-6.12-8.55-6.69-8.55-9.35s6.01-2.32 8.63-.87z'
          />
          <path
            d='M39.91 40.14l-2.06-10.58a2.63 2.63 0 00-2.91-2.12h-9.66l-.11.4a23.73 23.73 0 019.09 4.56 18.39 18.39 0 015.65 7.74z'
            fill='#f9a533'
          />
        </g>
      </g>
    </SvgIcon>
  )
}
