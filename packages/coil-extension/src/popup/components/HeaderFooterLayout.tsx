/* 
    HeaderFooterLayout 

    A layout is a wrapper component that should be used in the view component you wish to have this layout. 
    This layout is the original layout of the extension which wraps the view with the AccountBar and the WebMonetizedBar
*/

import React from 'react'
import { styled, Typography } from '@material-ui/core'
import { PopupProps } from '../types'
import { Colors } from '../../shared-theme/colors'

import { AccountBar } from './AccountBar'
import { WebMonetizedBar } from './WebMonetizedBar'
import { Container } from './util/Container'

//
// Styles
//
const OuterDiv = styled('div')({
    minWidth: '308px',
    maxWidth: '308px',
    height: 'auto',
    minHeight: '260px'
})

const CoilContainer = styled(Container)(({ theme }) => ({
    paddingRight: `${theme.spacing(4)}px`,
    paddingLeft: `${theme.spacing(4)}px`,
    paddingTop: `${theme.spacing(2)}px`,
    paddingBottom: `${theme.spacing(2)}px`,
    backgroundColor: Colors.Grey99
}))
  
const FooterString = styled('code')({
    display: 'flex',
    fontSize: '1em',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '40px',
    borderTop: `0.5px solid ${Colors.Grey89}`,
    textAlign: 'center'
})


//
// Component
//
export const HeaderFooterLayout = (props: React.FC<PopupProps>) => {
    const { context, children } = props; 
    const footer = context.store.extensionPopupFooterString

    return(
        <OuterDiv>
            <AccountBar context={context} />
            <CoilContainer>
                { children} // rendering views
            </CoilContainer>
            <WebMonetizedBar context={context} />
            {footer && (
            <Typography variant='caption'>
                <FooterString>{footer}</FooterString>
            </Typography>
            )}
        </OuterDiv>
    )
}