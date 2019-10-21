import React from 'react'
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'

const CoilAppBar: typeof AppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  text-align: center;
`

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
