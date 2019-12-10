import ReactDOM from 'react-dom'
import React from 'react'
import 'typeface-roboto'
import {
  createMuiTheme,
  Typography,
  ThemeProvider,
  makeStyles
} from '@material-ui/core'

import { PopupHeader } from './popupHeader'

const theme = createMuiTheme()

const useStyles = makeStyles({
  container: {
    padding: '20px'
  }
})

const rootEl = document.getElementById('root')
const Index = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <PopupHeader />
      </div>
    </ThemeProvider>
  )
}

ReactDOM.render(<Index />, rootEl)
