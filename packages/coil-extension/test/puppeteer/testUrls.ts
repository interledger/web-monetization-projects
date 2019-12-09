const urls = {
  youtubeUrl: 'https://www.youtube.com/watch?v=-QMbZx_w2_Y',
  twitchUrl: 'https://twitch.tv/vinesauce',
  coilArticle:
    'https://coil.com/p/thomasgardnerjr/Margaritaville-Jimmy-Buffett-cover-w-Sharper-s-Florist/dwntYG8d5'
} as const

export const testUrls: Record<string, string> & typeof urls = urls
