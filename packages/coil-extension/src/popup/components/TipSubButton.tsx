import React from 'react'

interface TipSubButtonProps {
  onClick: () => any
}

export const TipSubButton = ({ onClick }: TipSubButtonProps) => (
  <svg
    onClick={onClick}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='20' cy='20' r='20' fill='#E3E5E9' />
    <rect x='12' y='18' width='16' height='4' rx='2' fill='#8F949F' />
  </svg>
)
