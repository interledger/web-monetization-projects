// add the id's of the extensions to check their active states
export interface ExtensionData {
  extensionName: string
  extensionId: string
}

export const EXTENSION_IDS = {
  chrome: [
    {
      extensionName: 'CoilDevDist2',
      extensionId: 'deofcdfbmgdlnbdhpdmmegpokkaoadam'
    },
    {
      extensionName: 'Extensionb',
      extensionId: 'aaepchbipgcldoekbdgfilihmejochia'
    }
  ],
  firefox: [],
  edge: []
}
