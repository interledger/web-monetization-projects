import React from 'react'
import { styled, Typography } from '@material-ui/core'
import { StorageService } from '@web-monetization/wext/services'

import { Colors } from '../shared-theme/colors'
import { withSharedTheme } from '../shared-theme/withSharedTheme'

import { Container } from './components/util/Container'
import { AccountBar } from './components/AccountBar'
import { WebMonetizedBar } from './components/WebMonetizedBar'
import { Status } from './components/Status'
import { PopupHost } from './types'
import { PopupHostContext } from './context/popupHostContext'
import { StoreContext, useStoreState } from './context/storeContext'

const CoilContainer = styled(Container)(({ theme }) => ({
  paddingRight: `${theme.spacing(4)}px`,
  paddingLeft: `${theme.spacing(4)}px`,
  paddingTop: `${theme.spacing(2)}px`,
  paddingBottom: `${theme.spacing(2)}px`,
  backgroundColor: Colors.Grey99
}))

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

export function Index(props: {
  storage: Pick<StorageService, 'get'>
  host: PopupHost
}) {
  const store = useStoreState(props.storage, props.host)
  const footer = store.extensionPopupFooterString

  return (
    <PopupHostContext.Provider value={props.host}>
      <StoreContext.Provider value={store}>
        <OuterDiv>
          <AccountBar />
          <CoilContainer>
            <Status />
          </CoilContainer>
          <WebMonetizedBar />
          {footer && (
            <Typography variant='caption'>
              <FooterString>{footer}</FooterString>
            </Typography>
          )}
        </OuterDiv>
      </StoreContext.Provider>
    </PopupHostContext.Provider>
  )
}

export const IndexWithRoot = withSharedTheme(Index)
