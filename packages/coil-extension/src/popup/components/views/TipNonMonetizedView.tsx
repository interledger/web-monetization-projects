import React from 'react'
import { styled, Box } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { TipAmountFeedback } from '../TipAmountFeedback'

//
// Styles
//
const ComponentWrapper = styled('div')({
  padding: '0px 24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})

const Button = styled('button')(({ theme }) => ({
  cursor: 'pointer',
  width: '100%',
  height: '48px',
  backgroundColor: theme.palette.Grey50,
  color: theme.palette.Grey500,
  fontFamily: 'CircularStd',
  fontSize: '14px',
  letterSpacing: '.5px',
  border: 'none',
  borderRadius: '100px',
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: theme.palette.Grey50,
    color: theme.palette.Grey500
  }
}))

//
// Component
//
export const TipNonMonetizedView: React.FC = () => {
  return (
    <NewHeaderFooterLayout title='Support This Site'>
      <ComponentWrapper>
        <Box mt={6}>
          <AmountInput />
        </Box>
        <Box mt={5}>
          <HotkeyAmountButtons />
        </Box>
        <Box mt={4} mb={1} flex='1'>
          <TipAmountFeedback />
        </Box>
        <Box mb={2}>
          <Button disabled={true}>
            This site can&apos;t receive Coil tips
          </Button>
        </Box>
      </ComponentWrapper>
    </NewHeaderFooterLayout>
  )
}
