import React from 'react'
import { styled } from '@material-ui/core'
import { motion } from 'framer-motion'

import { useRouter } from '../context/routerContext'

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
  const transitionDuration = 0.1
  const xDistance = 100

  // not sure where to put this, using it to determine the direction
  const primaryRouteOrder = ['streaming', 'tipping', 'settings']
  const previousPathIndex = primaryRouteOrder.findIndex(primaryRoute => {
    return previousPath.includes(primaryRoute)
  })
  const currentPathIndex = primaryRouteOrder.findIndex(primaryRoute => {
    return path.includes(primaryRoute)
  })
  console.log()
  console.log('--- mike: ', path)
  console.log('previous: ', previousPathIndex)
  console.log('current: ', currentPathIndex)
  console.log()

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
        duration: transitionDuration
      }
    },
    exit: {
      opacity: 0,
      x: enterForward ? xDistance * -1 : xDistance,
      transition: {
        duration: transitionDuration
      }
    }
  }

  // staticVariants is set to simply eliminate the animation if the navigation is for a sub route
  const staticVariants = {
    initial: {
      opacity: 1,
      x: 0
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0
      }
    },
    exit: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0
      }
    }
  }

  // const variants = {
  //     initial: {
  //       opacity: 0,
  //       x: xDistance
  //     },
  //     enter: {
  //       opacity: 1,
  //       x: 0,
  //       transition: {
  //         duration: transitionDuration
  //       }
  //     },
  //     exit: {
  //       opacity: 0,
  //       x: xDistance * -1,
  //       transition: {
  //         duration: transitionDuration
  //       }
  //     }
  //   }
  return (
    <MotionComponentWrapper
      initial='initial'
      animate='enter'
      exit='exit'
      variants={isSubRoute ? staticVariants : primaryVariants}
    >
      {props.children}
    </MotionComponentWrapper>
  )
}
