// add the id's of the extensions to check their active states
export interface ExtensionInstance {
  name: string
  id: string
}

export type BrowserType = 'chrome' | 'firefox' | 'edge'

export const EXTENSIONS: Record<BrowserType, Array<ExtensionInstance>> = {
  chrome: [
    {
      name: 'Coil',
      id: 'locbifcbeldmnphbgkdigjmkbfkhbnca'
    },
    {
      name: 'CoilDevDist2',
      id: 'deofcdfbmgdlnbdhpdmmegpokkaoadam'
    },
    {
      name: 'CoilDev',
      id: 'hcohoecolgmlofifjaobjhidpoaciknp'
    },
    {
      name: 'CoilPreview',
      id: 'iehmfkldnblennopinmmagfidpflefkp'
    }
  ],
  firefox: [
    {
      name: 'Coil',
      id: 'coilfirefoxextension@coil.com'
    },
    {
      name: 'CoilWM2Preview',
      id: 'coilwm2previewfirefoxextension@niq.coil.com.xpi'
    }
  ],
  edge: [
    {
      name: 'Coil',
      id: 'ljionajlbinlfkdnpkloejeoogfgkojm'
    }
  ]
}
