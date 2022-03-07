// * NOTE: All AnimateWrapper components can be removed and should not effect layout

import React from 'react'
import { motion } from 'framer-motion'

import { useRouter } from '../context/routerContext'
import { ROUTES } from '../constants'

//
// Component
//

/*
    This animation is only for primary navigation transitions. 
    This does not handle the sub route navigation transitions such as from TipView -> TipConfirmView -> TipCompleteView
*/
export const AnimateTippingNavBarWrapper = (
  props: React.PropsWithChildren<any>
) => {
  const { path, previousPath } = useRouter()
  const transitionDuration = 0.1

  // not sure where to put this, using it to determine the direction
  const isSubRoute =
    path.includes('tipping') && previousPath.includes('tipping')

  // this is used to prevent animation when navigating back to TipView from TipCompleteView
  const preventAnimation = previousPath === ROUTES.tippingComplete

  const primaryVariants = {
    initial: {
      opacity: 1,
      y: preventAnimation ? 0 : 62
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: preventAnimation ? 0 : transitionDuration
      }
    },
    exit: {
      opacity: 0,
      y: 62,
      transition: {
        duration: preventAnimation ? 0 : transitionDuration
      }
    }
  }

  // notAnimated is set to simply eliminate the animation if the navigation is for a primary route
  // the rules used in the variants need to be overridden in order to eliminate a jump if the animation should not run.
  const notAnimated = {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0
    }
  }

  return (
    <motion.div
      initial={isSubRoute ? 'initial' : notAnimated}
      animate={isSubRoute ? 'enter' : notAnimated}
      exit={isSubRoute ? 'exit' : notAnimated}
      variants={primaryVariants}
    >
      {props.children}
    </motion.div>
  )
}
