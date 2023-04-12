import * as createPalette from '@material-ui/core/styles/createPalette'

export { createPalette }

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    Black?: string
    Grey800?: string
    Grey700?: string
    Grey500?: string
    Grey100?: string
    Grey200?: string
    Grey50?: string
    White?: string
    Blue700?: string
    Blue400?: string
    Blue200?: string
    Blue10?: string
    Red700?: string
    Red400?: string
    Red200?: string
    Red10?: string
    Green700?: string
    Green400?: string
    Green200?: string
    Green10?: string
    Yellow700?: string
    Yellow400?: string
    Yellow200?: string
    Yellow10?: string
    Violet700?: string
    Violet400?: string
    Violet200?: string
    Violet10?: string
  }
  interface Palette {
    Black?: string
    Grey800?: string
    Grey700?: string
    Grey500?: string
    Grey100?: string
    Grey200?: string
    Grey50?: string
    White?: string
    Blue700?: string
    Blue400?: string
    Blue200?: string
    Blue10?: string
    Red700?: string
    Red400?: string
    Red200?: string
    Red10?: string
    Green700?: string
    Green400?: string
    Green200?: string
    Green10?: string
    Yellow700?: string
    Yellow400?: string
    Yellow200?: string
    Yellow10?: string
    Violet700?: string
    Violet400?: string
    Violet200?: string
    Violet10?: string
  }
}
