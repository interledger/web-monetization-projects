type TestUrls = Record<string, string>

type Domain = string

const urls = {
  'https://coil.com': {
    twitchUrl: 'https://twitch.tv/vinesauce',
    youtubeUrl: 'https://www.youtube.com/watch?v=8EKg_rBWZdc',
    externalSite: 'https://hackernoon.com/',
    coilArticle:
      'https://coil.com/p/sharafian/Doubling-Down-on-Privacy/cD_ZiwT2J'
  },
  'https://staging.coil.com': {
    coilArticle:
      'https://staging.coil.com/p/androswong418/Andros-first-post/pD5aXIAvH'
  }
} as Record<Domain, TestUrls>

export const testUrls = urls
