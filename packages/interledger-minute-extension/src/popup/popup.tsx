import ReactDOM from 'react-dom'
import React from 'react'
import 'typeface-roboto'
import {
  createMuiTheme,
  Typography,
  ThemeProvider,
  makeStyles,
  Grid
} from '@material-ui/core'

import { PopupHeader } from './popupHeader'
import { StreamRate } from './streamRate'
import { AccountBalance } from './accountBalance'
import { BlockButton } from './blockButton'
import { PauseButton } from './pauseButton'
import { MonetizedStatus } from './monetizedStatus'

const theme = createMuiTheme()

const useStyles = makeStyles({
  container: {
    padding: '20px',
    width: '308px',
    height: '270px'
  },
  accountInfo: {
    padding: '1rem 0 2rem'
  },
  monetizedStatus: {
    padding: '2rem 0'
  }
})

const rootEl = document.getElementById('root')
const Index = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <PopupHeader />
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.accountInfo}
        >
          <Grid item>
            <StreamRate rate={100}></StreamRate>
          </Grid>
          <Grid item>
            <AccountBalance
              creditUsed={1.74}
              creditTotal={4.2}
            ></AccountBalance>
          </Grid>
        </Grid>

        <Grid container direction='row' justify='center' alignItems='center'>
          <BlockButton isBlocked={true} />
          <PauseButton />
        </Grid>

        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.monetizedStatus}
        >
          <Grid item>
            <MonetizedStatus status={true} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

ReactDOM.render(<Index />, rootEl)
