// * NOTE: All AnimateWrapper components can be removed and should not effect layout

import React from 'react'
import { styled } from '@mui/material'
import { motion } from 'framer-motion'

import { useRouter } from '../../context/routerContext'

import { pageTransitionDuration } from './animation-constants'

//
// Styles
//
const MotionComponentWrapper = styled(motion.div)({
  flex: '1',
  display: 'flex',
  flexDirection: 'column'
})

//
// Component
//

/*
    This animation is only for primary navigation transitions. 
    This does not handle the sub route navigation transitions such as from TipView -> TipConfirmView -> TipCompleteView
*/
export const AnimatePageTransitionWrapper = (
  props: React.PropsWithChildren<any>
) => {
  const { path, previousPath } = useRouter()
  const xDistance = 100

  const primaryRouteOrder = ['streaming', 'tipping', 'settings']
  const previousPathIndex = primaryRouteOrder.findIndex(primaryRoute => {
    return previousPath.includes(primaryRoute)
  })
  const currentPathIndex = primaryRouteOrder.findIndex(primaryRoute => {
    return path.includes(primaryRoute)
  })
  const enterForward = currentPathIndex > previousPathIndex
  const isSubRoute = currentPathIndex === previousPathIndex

  const primaryVariants = {
    initial: {
      opacity: 0,
      x: enterForward ? xDistance : -1 * xDistance
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: pageTransitionDuration
      }
    },
    exit: {
      opacity: 0,
      x: enterForward ? xDistance * -1 : xDistance,
      transition: {
        duration: pageTransitionDuration
      }
    }
  }

  // notAnimated is set to simply eliminate the animation if the navigation is for a sub route
  // the rules used in the variants need to be overridden in order to eliminate a jump if the animation should not run.
  const notAnimated = {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0
    }
  }

  // using a variant in this instance instead of just inline rules
  // because the header for page transitions somehow will still slide to the right
  // on sub page navigations otherwise
  const notAnimatedVariants = {
    initial: notAnimated,
    enter: notAnimated,
    exit: notAnimated
  }

  return (
    <MotionComponentWrapper
      initial='initial'
      animate='enter'
      exit='exit'
      variants={isSubRoute ? notAnimatedVariants : primaryVariants}
    >
      {props.children}
    </MotionComponentWrapper>
  )
}
