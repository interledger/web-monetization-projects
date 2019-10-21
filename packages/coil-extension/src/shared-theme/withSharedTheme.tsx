import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from 'styled-components'
import { JssProvider } from 'react-jss'

import { theme } from './theme'
import { generateClassName, jss } from './jss'

export function withSharedTheme<P>(Component: React.ComponentType<P>) {
  return function WithTheme(props: P) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <JssProvider jss={jss} generateId={generateClassName}>
            <Component {...props} />
          </JssProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
