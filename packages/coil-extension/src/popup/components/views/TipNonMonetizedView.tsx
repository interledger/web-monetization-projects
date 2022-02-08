import React from 'react'
import { styled, Typography, Box, useTheme } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

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
  const theme = useTheme()
  return (
    <NewHeaderFooterLayout title='Tip This Site'>
      <Box mt={4} mb={2} height='156px'>
        <img
          src='/res/img-tipping-off.png'
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </Box>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        This site can&apos;t receive tips
      </Typography>
      <Typography variant='subtitle1' align='center'>
        Only web monetized sites can
        <br />
        receive Coil tips.
      </Typography>
    </NewHeaderFooterLayout>
  )
}
