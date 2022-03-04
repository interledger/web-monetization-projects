import React from 'react'
import { motion } from 'framer-motion'

//
// Component
//

export const AnimateTipCompleteViewNavBarWrapper = (
  props: React.PropsWithChildren<any>
) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 62
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1
      }
    },
    exit: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0
      }
    }
  }

  return (
    <motion.div
      initial='initial'
      animate='enter'
      exit='exit'
      variants={variants}
    >
      {props.children}
    </motion.div>
  )
}
