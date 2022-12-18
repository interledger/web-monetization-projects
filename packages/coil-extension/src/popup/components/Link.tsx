import React from 'react'
import { styled, Theme } from '@mui/material'

import { useHost } from '../context/popupHostContext'

//
// Styles
//

const ComponentWrapper = styled('a')(
  ({ theme, color }: { theme: Theme; color: string | undefined }) => ({
    textDecoration: 'none',
    cursor: 'pointer',
    color: color ? color : theme.palette.Blue400
  })
)

//
// Models
//
interface ILink {
  to: string
  color?: string
}

//
// Component
//

export const Link = (props: React.PropsWithChildren<ILink>) => {
  const {
    runtime: { tabOpener }
  } = useHost()

  return (
    <ComponentWrapper
      tabIndex={0}
      color={props.color}
      onClick={tabOpener(props.to)}
      onKeyPress={tabOpener(props.to)}
    >
      {props.children}
    </ComponentWrapper>
  )
}
