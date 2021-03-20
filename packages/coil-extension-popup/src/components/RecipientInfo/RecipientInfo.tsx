import React from 'react'
import { styled } from '@material-ui/core'
import {
  getPageFaviconPath,
  getPageHost,
  getPageTitle
} from '@coil/extension-popup/utils/get-page-data.util'
import { Colors } from '@coil/extension-popup/theme'

//
// Styles
//
const RecipientWrapper = styled('div')({
  textAlign: 'center'
})

const RecipientMessage = styled('p')({
  color: Colors.Grey500,
  fontWeight: 'normal',
  margin: '0px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& img': {
    flexShrink: 0,
    width: '16px',
    height: 'auto',
    marginLeft: '6px',
    marginRight: '4px',
    marginBottom: '-3px'
  }
})

const RecipientTitle = styled('p')({
  color: Colors.Grey800,
  fontWeight: 'normal',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: '0px'
})

//
// Component
//
export const RecipientInfo = (): React.ReactElement => {
  return (
    <RecipientWrapper>
      <RecipientMessage>
        <span title={getPageHost()}>
          Donate to <img src={getPageFaviconPath()} alt='site logo' />{' '}
          {getPageHost()}
        </span>
      </RecipientMessage>
      <RecipientTitle title={getPageTitle()}>{getPageTitle()}</RecipientTitle>
    </RecipientWrapper>
  )
}
