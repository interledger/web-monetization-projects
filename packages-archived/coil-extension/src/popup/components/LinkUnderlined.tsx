import React from 'react'
import { styled } from '@material-ui/core'

import { useHost } from '../context/popupHostContext'

//
// Styles
//

const ComponentWrapper = styled('a')(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer',
  color: theme.palette.Blue400
}))

//
// Models
//
interface ILinkedUnderline {
  to: string
}

//
// Component
//

export const LinkUnderlined = (
  props: React.PropsWithChildren<ILinkedUnderline>
) => {
  const {
    runtime: { tabOpener }
  } = useHost()

  return (
    <ComponentWrapper
      tabIndex={0}
      onKeyPress={tabOpener(props.to)}
      onClick={tabOpener(props.to)}
    >
      {props.children}
    </ComponentWrapper>
  )
}
