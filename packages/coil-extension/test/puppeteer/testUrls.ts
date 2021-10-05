type TestUrls = Record<string, string>

type Domain = string

const urls = {
  'https://coil.com': {
    twitchUrl: 'https://twitch.tv/vinesauce',
    youtubeUrl: 'https://www.youtube.com/watch?v=l1btEwwRePs',
    externalSite: 'https://www.xrptipbot.com/',
    coilArticle:
      'https://coil.com/p/thomasgardnerjr/Margaritaville-Jimmy-Buffett-cover-w-Sharper-s-Florist/dwntYG8d5'
  },
  'https://staging.coil.com': {
    coilArticle:
      'https://staging.coil.com/p/androswong418/Andros-first-post/pD5aXIAvH'
  }
} as Record<Domain, TestUrls>

export const testUrls = urls
