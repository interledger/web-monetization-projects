import React, { useEffect, useState } from 'react'
import { styled, Typography } from '@material-ui/core'

import { Colors } from '../shared-theme/colors'
import { ToPopupMessage } from '../types/commands'

import { AccountBar } from './components/AccountBar'
import { WebMonetizedBar } from './components/WebMonetizedBar'
import { Status } from './components/Status'
import { PopupProps } from './types'

const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

const FooterString = styled('code')({
  display: 'flex',
  fontSize: '1em',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '40px',
  borderTop: `0.5px solid ${Colors.Grey89}`,
  textAlign: 'center'
})

export function Index(props: PopupProps) {
  const [_, setLastMonetizationProgress] = useState(Date.now())

  function syncStoreAndSetState() {
    props.context.store.sync()
    setLastMonetizationProgress(Date.now())
  }

  function bindMessageListener(): void {
    props.context.runtime.onMessageAddListener((message: ToPopupMessage) => {
      if (message.command === 'localStorageUpdate') {
        syncStoreAndSetState()
      }
      return false
    })
  }

  useEffect(bindMessageListener, [])

  const context = { ...props.context }

  const footer = context.store.extensionPopupFooterString
  return (
    <OuterDiv>
      <AccountBar context={context} />
      <Status context={context} />
      <WebMonetizedBar context={context} />
      {footer && (
        <Typography variant='caption'>
          <FooterString>{footer}</FooterString>
        </Typography>
      )}
    </OuterDiv>
  )
}
