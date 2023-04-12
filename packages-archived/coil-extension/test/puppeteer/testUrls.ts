type TestUrls = Record<string, string>

type Domain = string

export const testUrls = {
  'https://coil.com': {
    twitchUrl: 'https://twitch.tv/vinesauce',
    youtubeUrl: 'https://www.youtube.com/watch?v=8EKg_rBWZdc',
    externalSite: 'https://dev.to',
    coilArticle: 'https://coil.com/p/travis/Test-Image-Post/Kk8LC4Ebu'
  },
  'https://staging.coil.com': {
    coilArticle:
      'https://staging.coil.com/p/androswong418/Andros-first-post/pD5aXIAvH'
  }
} as Record<Domain, TestUrls>

testUrls['http://localhost:4000'] = testUrls['https://coil.com']
