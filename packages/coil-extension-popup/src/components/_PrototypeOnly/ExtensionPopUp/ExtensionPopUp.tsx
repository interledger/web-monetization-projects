//! prototype use only

import React from 'react'
import { styled, Grow } from '@material-ui/core'

//
// Styles
//
const ComponentWrapper = styled('div')(({ open }: { open: boolean }) => ({
  position: 'absolute',
  top: '50px',
  right: '105px',
  minWidth: '10px',
  minHeight: '10px',
  backgroundColor: '#FCFCFC',
  border: '.5px solid #B2B2B2',
  borderRadius: '2px',
  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
  display: open ? 'block' : 'none'
}))

//
// Component
//
export const ExtensionPopUp = (props: {
  isOpen: boolean
  children?: React.ReactNode
}): React.ReactElement => {
  return (
    <Grow
      in={props.isOpen}
      style={{ transformOrigin: 'right top' }}
      {...(props.isOpen ? { timeout: 200 } : {})}
    >
      <ComponentWrapper open={true}>{props.children}</ComponentWrapper>
    </Grow>
  )
}
