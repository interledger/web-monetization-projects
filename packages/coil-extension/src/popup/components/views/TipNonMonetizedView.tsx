import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

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
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
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
