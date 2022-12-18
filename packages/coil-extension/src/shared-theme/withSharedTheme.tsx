import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import { theme } from './theme'

export function withSharedTheme<P extends object>(
  Component: React.ComponentType<React.PropsWithChildren<P>>
) {
  return function WithTheme(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }
}
