// * NOTE: All AnimateWrapper components can be removed and should not effect layout

import React from 'react'
import { motion } from 'framer-motion'

import { useRouter } from '../context/routerContext'

//
// Component
//

/*
    This animation is only for primary navigation transitions. 
    This does not handle the sub route navigation transitions such as from TipView -> TipConfirmView -> TipCompleteView
*/
export const AnimateTipViewNavBarWrapper = (
  props: React.PropsWithChildren<any>
) => {
  const { path, previousPath } = useRouter()
  const transitionDuration = 0.1

  // not sure where to put this, using it to determine the direction
  const isSubRoute =
    path.includes('tipping') && previousPath.includes('tipping')

  const primaryVariants = {
    initial: {
      opacity: 1,
      y: 62
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: transitionDuration
      }
    },
    exit: {
      opacity: 0,
      y: 62,
      transition: {
        duration: transitionDuration
      }
    }
  }

  // staticVariants is set to simply eliminate the animation if the navigation is for a primary route
  const staticSettings = {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0
    }
  }
  const staticVariants = {
    initial: staticSettings,
    enter: staticSettings,
    exit: staticSettings
  }

  return (
    <motion.div
      initial='initial'
      animate='enter'
      exit='exit'
      variants={isSubRoute ? primaryVariants : staticVariants}
    >
      {props.children}
    </motion.div>
  )
}
