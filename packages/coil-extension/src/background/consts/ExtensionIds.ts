// add the id's of the extensions to check their active states
export interface ExtensionInstance {
  extensionName: string
  extensionId: string
}

export type BrowserType = 'chrome' | 'firefox' | 'edge'

export const EXTENSION_IDS: Record<BrowserType, Array<ExtensionInstance>> = {
  chrome: [
    {
      extensionName: 'CoilDevDist2',
      extensionId: 'deofcdfbmgdlnbdhpdmmegpokkaoadam'
    },
    {
      extensionName: 'CoilDev',
      extensionId: 'hcohoecolgmlofifjaobjhidpoaciknp'
    },
    {
      extensionName: 'CoilPreview',
      extensionId: 'iehmfkldnblennopinmmagfidpflefkp'
    }
  ],
  firefox: [],
  edge: []
}
