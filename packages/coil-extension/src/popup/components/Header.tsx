import React from 'react'
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const CoilAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center'
}))

export const Header = () => {
  return (
    <CoilAppBar position='static' color='inherit' elevation={0}>
      <Toolbar>
        <Grid container justify='center' spacing={8} alignItems='flex-end'>
          <Grid item>
            <img src='/res/CoilHeaderLogo.svg' />
          </Grid>
          <Grid item>
            <Typography variant='h5'>Extension</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </CoilAppBar>
  )
}
