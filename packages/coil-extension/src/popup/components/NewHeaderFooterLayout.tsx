// * This needs to be renamed once the old HeaderFooterLayout can be removed

import React from 'react'
import { styled } from '@material-ui/core'

import { Header } from './Header'
import { NavBar } from './NavBar'

//
// Styles
//
const BodyContainer = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'column'
})

//
// Models
//
interface INewHeaderFooterLayout {
  title?: string
}

//
// Component
//

export const NewHeaderFooterLayout: React.FC<
  INewHeaderFooterLayout
> = props => {
  return (
    <React.Fragment>
      <Header>{props.title}</Header>
      <BodyContainer>{props.children}</BodyContainer>
      <NavBar />
    </React.Fragment>
  )
}
