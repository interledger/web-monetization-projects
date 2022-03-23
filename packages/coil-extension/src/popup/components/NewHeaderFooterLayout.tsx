// * This needs to be renamed once the old HeaderFooterLayout can be removed

import React from 'react'
import { styled } from '@material-ui/core'
import { motion, AnimatePresence } from 'framer-motion'

import { Header } from './Header'
import { NavBar } from './NavBar'
import { AnimatePageTransitionWrapper } from './page-animation-wrappers/AnimatePageTransitionWrapper'
//
// Styles
//
const BodyContainer = styled(`div`)({
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
      <Header>
        <AnimatePageTransitionWrapper>
          {props.title}
        </AnimatePageTransitionWrapper>
      </Header>
      <AnimatePageTransitionWrapper>
        <BodyContainer>{props.children}</BodyContainer>
      </AnimatePageTransitionWrapper>
      <NavBar />
    </React.Fragment>
  )
}
