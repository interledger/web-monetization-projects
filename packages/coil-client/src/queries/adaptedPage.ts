import type { GraphQlClient } from '../graphQlClient'

export const adaptedPageQuery = `query getPage($url: String!, $channelId: String) {
  adaptedPage(videoUrl: $url, channelId: $channelId) {
    paymentPointer
    channelImage
  }
}`

export interface GetPageData {
  adaptedPage: {
    paymentPointer: string | null
    channelImage: string | null
  }
}

export async function adaptedPage(
  this: GraphQlClient,
  url: string,
  channelId?: string
): Promise<GetPageData['adaptedPage']> {
  const message = await this.query<GetPageData>({
    query: adaptedPageQuery,
    variables: { url, channelId },
    noCredentials: true
  })
  const data = message.data
  const adaptedPage = data?.adaptedPage
  const paymentPointer = adaptedPage?.paymentPointer
  const channelImage = adaptedPage?.channelImage
  return {
    channelImage,
    paymentPointer
  }
}
