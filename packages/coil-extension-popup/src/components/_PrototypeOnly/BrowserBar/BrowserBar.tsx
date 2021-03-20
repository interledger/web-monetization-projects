//! prototype use only

import React from 'react'
import { styled, Box, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { ExtensionSvgIcon } from '@coil/extension-popup/components'
import * as actions from '@coil/extension-popup/redux/actions'
import { useDispatch } from 'react-redux'

//
// Styles
//

const ComponentWrapper = styled(Box)({
  width: '100%',
  minHeight: '40px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2px 25px'
})

const UrlBar = styled(Box)({
  fontFamily: 'sans-serif',
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.05)',
  color: '#7A7A7A',
  borderRadius: '30px',
  height: '30px',
  padding: '2px 25px',
  margin: '0px 25px',
  display: 'flex',
  alignItems: 'center'
})

const BrowserButton = styled(IconButton)({
  padding: '3px'
})

const ExtensionPlaceholder = styled('div')({
  width: '16px',
  height: '16px',
  margin: '2px 5px',
  borderRadius: '2px',
  backgroundColor: 'rgba(0,0,0,0.05)'
})

//
// Component
//

export const BrowserBar = (): React.ReactElement => {
  const dispatch = useDispatch()

  const handleToggleSettings = () => {
    dispatch(actions.toggle_settings())
  }

  const handleToggleExtension = () => {
    dispatch(actions.toggle_extension())
  }

  return (
    <ComponentWrapper>
      <BrowserButton onClick={handleToggleSettings}>
        <MoreVertIcon />
      </BrowserButton>
      <UrlBar>{window.location.href}</UrlBar>
      <BrowserButton onClick={handleToggleExtension}>
        <ExtensionSvgIcon />
      </BrowserButton>
      <ExtensionPlaceholder />
      <ExtensionPlaceholder />
      <ExtensionPlaceholder />
    </ComponentWrapper>
  )
}
