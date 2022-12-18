import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material'

//
// Styled
//
const RandomMessageWrapper = styled('div')({
  fontSize: '18px',
  '& p': {
    margin: '2px 0px'
  }
})

//
// Component
//
export const RandomThankYouMessage = () => {
  const [random, setRandom] = useState<number>(0)

  // const messagesArray = [
  //   'Thanks for your support! \n ❤️💸❤️',
  //   'You are a rockstar 🤘\n Thank you for your support.',
  //   'Woohoo!!! You made my day.',
  //   'Make it rain!'
  // ]

  const messagesArray = [
    'Thanks for the tip!',
    'Thanks for tipping',
    'Thanks for your support!',
    'Thanks so much',
    'Thanks for your generosity',
    "You're too kind!",
    "You're awesome!"
  ]

  useEffect(() => {
    setRandom(getRandomInt(0, messagesArray.length))
  }, [])

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  return (
    <RandomMessageWrapper>
      {messagesArray[random].split('\n').map((str: string, index: number) => {
        return <p key={`msg-str-${index}`}>{str}</p>
      })}
    </RandomMessageWrapper>
  )
}
