import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    palette: Palette
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    palette?: PaletteOptions
  }
}
