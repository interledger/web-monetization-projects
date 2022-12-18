import React from 'react'
import { SvgIconProps } from '@mui/material'

import { AmericanExpress } from './AmericanExpress'
import { DinersClub } from './DinersClub'
import { Discover } from './Discover'
import { JCB } from './JCB'
import { MasterCard } from './MasterCard'
import { Visa } from './Visa'
import { CreditCardPlaceholder } from './CreditCardPlaceholder'

//
// Models
//
interface ICreditCardIcon extends SvgIconProps {
  provider: string | undefined
}

//
// Component
//
export const CreditCardIcon = (props: ICreditCardIcon): React.ReactElement => {
  const { provider, ...rest } = props
  switch (provider) {
    case 'American Express':
      return <AmericanExpress {...rest} />
    case 'Diners Club':
      return <DinersClub {...rest} />
    case 'Discover':
      return <Discover {...rest} />
    case 'JCB':
      return <JCB {...rest} />
    case 'MasterCard':
      return <MasterCard {...rest} />
    case 'Visa':
      return <Visa {...rest} />
    default:
      return <CreditCardPlaceholder {...rest} />
  }
}
