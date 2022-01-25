type TestUrls = Record<string, string>

type Domain = string

const urls = {
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

const nodeVersion = Number(process.version.replace(/[^0-0.]/, '').split('.')[0])

if (nodeVersion > 14) {
  // There is some kind of bug that manifests in puppeteer 12+ on node 16+
  // where if there is an empty iframe (with src= about: blank) then the test
  // will fail with complaints about a detached frame.
  // See: https://github.com/coilhq/web-monetization-projects/issues/2411
  // This is only a problem for youtube urls, so don't test this url on node
  // versions greater than 14.
  delete urls['https://coil.com']['youtubeUrl']
}

export const testUrls = urls
