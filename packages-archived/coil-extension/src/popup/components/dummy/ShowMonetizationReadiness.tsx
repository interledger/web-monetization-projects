import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { Header } from '../Header'

const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 308,
    height: 246,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  footer: {
    height: 40,
    padding: theme.spacing(2),
    borderTop: `1px solid #E3E5E9;`,
    ...centered
  },
  imageContainer: {
    ...centered,
    height: '100%'
  },
  image: {
    width: 80,
    height: 80,
    maxWidth: '100%',
    maxHeight: '100%'
  }
}))

export function ShowMonetizationReadiness(props: {
  monetized?: boolean | null
}) {
  const classes = useStyles()

  const yesOrNo = props.monetized ? 'yes' : 'no'

  const isOrIsNot = props.monetized ? 'is' : "isn't"
  const footer = `This site ${isOrIsNot} Web Monetization ready`

  return (
    <Container className={classes.root}>
      <Header> Web Monetization </Header>
      <Box className={classes.imageContainer}>
        <img
          src={'/res/img-wm-' + yesOrNo + '.png'}
          alt='centered image'
          className={classes.image}
        />
      </Box>
      <Box className={classes.footer}>
        <Typography variant='subtitle1' align='center'>
          {footer}
        </Typography>
      </Box>
    </Container>
  )
}
