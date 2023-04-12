import React from 'react'
import { motion } from 'framer-motion'

//
// Component
//

export const AnimateTipCompleteViewMessageWrapper = (
  props: React.PropsWithChildren<any>
) => {
  const variants = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
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
