const iconsConst = {
  Active: '../res/monetized.png',
  Inactive: '../res/inactive.png',

  ActiveXMAS: '../res/icn-coil-on-xmas.png',
  InactiveXMAS: '../res/icn-coil-off-xmas.png',
  /**
   * TODO: add fireworks icons
   * TODO: will need to update {@see PopupBrowserAction#setDefaultInactive}
   * */
  ActiveNewYears: '../res/icn-coil-on.png',
  InactiveNewYears: '../res/icn-coil-off.png',

  inactive: '../res/icn-coil-ext@4x.png',
  active: '../res/icn-coil-ext-connecting@4x.png',
  'active-streaming': '../res/icn-coil-ext-streaming@4x.png',
  'active-unavailable': '../res/icn-coil-ext-alert@4x.png',
  'inactive-unavailable': '../res/icn-coil-ext-alert@4x.png',
  'tipping-only': '../res/icn-coil-ext-connecting@4x.png'
} as const

export const Icons: Record<string, string> & typeof iconsConst = iconsConst
