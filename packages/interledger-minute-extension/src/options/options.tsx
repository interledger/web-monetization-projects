import ReactDOM from 'react-dom'
import React from 'react'
import { Grid, makeStyles, ThemeProvider, Typography } from '@material-ui/core'

import { Colors, Settings } from '../variables'
import { Logo } from '../logo'
import { theme } from '../theme'

import { MonthlyLimit } from './monthlyLimit'
import { StreamingPerSecond } from './streamingPerSecond'
import { BlockedWebsite } from './blockedWebsite'

const blockedWebsites = [
  { icon: 'http://facebook.com/favicon.ico', url: 'facebook.com' },
  { icon: 'http://twitter.com/favicon.ico', url: 'twitter.com' },
  { icon: 'http://youtube.com/favicon.ico', url: 'youtube.com' },
  { icon: 'http://google.com/favicon.ico', url: 'google.com' }
]

const useStyles = makeStyles({
  container: {
    padding: Settings.padding,
    maxWidth: Settings.maxWidth,
    margin: '0 auto'
  },
  heading: {
    fontSize: '2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem'
    },
    marginLeft: '20px',
    fontWeight: 400,
    '& span': {
      fontWeight: 300
    }
  },
  header: {
    paddingBottom: '16px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '30px'
    },
    borderBottom: `1px solid ${Colors.grey}`
  },
  section: {
    margin: `calc(${Settings.padding}/2)`,
    [theme.breakpoints.up('sm')]: {
      margin: Settings.padding
    }
  },
  h4: {
    fontSize: '1.5rem',
    paddingBottom: '0.5rem',
    margin: '2.5rem 0 1.25rem',
    display: 'inline-flex',
    fontWeight: 500,
    borderBottom: `1px solid ${Colors.grey}`
  }
})

const rootEl = document.getElementById('root')
const Index = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        className={classes.container}
      >
        <Grid item className={classes.header}>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item>
              <Logo large={true}></Logo>
            </Grid>
            <Grid item>
              <Typography variant='h1' className={classes.heading}>
                Minute <span>Settings</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.section}>
          <Typography variant='h4' className={classes.h4}>
            Stream Options
          </Typography>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item xs={12} md={5}>
              <MonthlyLimit limit={4.2} />
            </Grid>
            <Grid item xs={12} md={7}>
              <StreamingPerSecond limit={100} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.section}>
          <Typography variant='h4' className={classes.h4}>
            Blocked Websites
          </Typography>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
          >
            {blockedWebsites &&
              blockedWebsites.map((website: any, i: number) => (
                <BlockedWebsite key={i} icon={website.icon} url={website.url} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

ReactDOM.render(<Index />, rootEl)
