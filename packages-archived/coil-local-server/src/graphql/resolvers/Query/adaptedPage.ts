import { QueryResolvers } from '../../generated/graphql'

const mapping: Record<
  string,
  { paymentPointer: string; channelImage?: string }
> = {
  ['https://www.youtube.com/watch?v=8EKg_rBWZdc/']: {
    paymentPointer: '$ilp.uphold.com/L6hqMwPM2p99',
    channelImage:
      'https://yt3.ggpht.com/ytc/AKedOLQrKFE2gqcn3JtwfCHfCZx3-fSAQt6cCa-s8R-Y=s88-c-k-c0x00ffffff-no-rj'
  },
  ['https://www.twitch.tv/vinesauce/']: {
    paymentPointer: '$spsp.coil.com/twitch/vinesauce',
    channelImage:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/b5dc0add-a5cc-47ea-8562-b23fee4b4267-profile_image-300x300.png'
  }
}

export const adaptedPage: QueryResolvers['adaptedPage'] = (
  parent,
  args,
  ctx,
  info
) => {
  if (args.videoUrl) {
    const normed = new URL(args.videoUrl).href
    const entry = mapping[normed]
    if (entry) {
      return entry
    }
  }
  return {
    channelImage: undefined,
    paymentPointer: undefined
  }
}
