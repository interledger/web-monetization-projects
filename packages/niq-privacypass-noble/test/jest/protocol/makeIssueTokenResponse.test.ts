import { ProjPointType } from '@noble/curves/abstract/weierstrass'

import { b64db, b64dbn, b64dj, b64dpt, b64ds } from '../../../src/b64'
import { makeIssueTokenResponse } from '../../../src/protocol/makeIssueTokenResponse'
import { IssueTokenResponse } from '../../../src/protocol/types'
import { DLEQ } from '../../../src/crypto/dleq'
import { computeComposites } from '../../../src/crypto/computeComposites'
import { h2Config } from '../tesconfig'

const commitment = {
  G: b64dpt(
    'BCyENEmEdWz3Wivy7iwXFcLZ0xOW7PCe2BtoMD6sYBqUK+PBZad5euc1tP9ekcdSDxxK3ijgHsQ1PqQim4VqDGo='
  ),
  H: b64dpt(
    'BJj8hRLfPSe+GNfbS3Jd2XmYU3XTEJw+TaTxx7M9lxVY9BDI6toWVpmffMR0P28XJcV3W0SGWX2OOrRLaBYGhwM='
  )
}

const issueTokenRequest: {
  bF: bigint[]
  tokens: Uint8Array[]
  bP: ProjPointType<bigint>[]
} = {
  tokens: [
    'bTODDOVWkNUW8VK+4a8D1wubMtz804GBPM4eYEt0IIg=',
    'sY0yxfG2VliPSEETD3l2QsHYbrZpGyrmt9lmV4ej/Gs=',
    '4v+rIzpMU6glWwvyYirgYArx1GgCFQwx6L14P705JcM=',
    'Svk9a4eayMpPEoVkf24MJ/NMixkdHYdIVDXavIKTx9o=',
    'clbo/OWrqP7VXrhma8pxS7tl3CjExIzC/9Tfx7kCwpc=',
    'rhe+FYLzYyM7eo6TJ11Qz82DVlC5FmdSnRPYL4LhyxU=',
    '9Xp9AERNerrvhkGvGCzM0POHJhrZ3LitTgqmdee38Qk=',
    'vcBG3WQdTKpeMoxITUHLV4izUzxZo9Pe6zFH4/xXJkk=',
    'La3LyDe6vst1SLo+8ukvQKdBT7EJpvNbyXBOKuWHx08=',
    'l5NLNwnikjr/ZY2NBGei4w/vxFXQeg7J+WVmNaFmFNQ='
  ].map(b64db),
  bP: [
    'BNswDGPeqbINC7cwX86UPMFalMtr66KZxFmz1sXR2DpUreLaC0tJVaX0+myA6dkwTyfmhqf0fwpYPibpluzCP+8=',
    'BDdv3wJdr93wT/VdVhahIOWBQSPSusrrYEW1SzFDCvOPXvwxchapdEmFdDhdnKnceSuqGmKWl1RXMyMrb2socuw=',
    'BCKP29fZ7Je4dyIcDMaaayyOO+PaagaxHOr6+JPOPNc1haLpyKDuWoC5sPTIo0vn9e39WZecEJ/wcLMh0q5nVsY=',
    'BOguVK2jMENF3J/gL78LRvnM8W7q4z+c800wp9YcKvmIn2RkMhEZfoyUciuN1SOCZsph2kywRKd8hnwsHgK2ntA=',
    'BBwOqAXrqgE+yp37eXB6PsnoMW46P7XrNxro+NyNu6CZOeV51FBx9AkGH9bN/YD/oiEwT6ctLkHhM6yQAFpPWNM=',
    'BIGZ/3SzUSt0c6Nm/hJ4nllpwK7ZinkyZnSlMZh5jhMSnp7nknoFcCx8oifpZJg06pMwMF3nzJwjwx/aQDcZ7SU=',
    'BPwyktNlumdUhlRRUsIxQMHnbYoPDa6Bicj7kbLuz3yi6xzRosKN8EB/gDQYtXdi8HVcdcLOiXurXVSheClMcTw=',
    'BMl7uA5ZNMu58lNpTtwIV52p1nFM5pwnKMPxM00/vR7weReClPUeQ7IX2shDx7lIFKBtfGGERm+zT5VZBIqgMD0=',
    'BMSjrSRJf5U9FvZ0N0hHXnHn7oLUrMBP9+F+SGsyBZaMWKX9cyUSmUyZd0jHpzWagDN41nLpK7yPL9W2itOtd2w=',
    'BFLWW9txBn+cwXAdy/1bqILZUS9QWWfTJ7P4cnOE5MGPymHKs5xI+2uB9WSQ6q00V7FtTuIM4jkkwFS+S73k4ak='
  ].map(v => b64dpt(v)),
  bF: [
    'lPb9JM6oxQlMC7HxZOScd/feaGVr4aB2uaF1i1dTSes=',
    'Y7ePm5mHNVUKl32VNdr9KEa8bjCyXbcb8nBjZ3XRhts=',
    'SaRrsBCseMx7RSZ0zewvGT39hqO9hfNuRVZLyZw/ZQA=',
    '6pKVCdCN0VO9/Vfoc34t5bp3gCfjjMM1y/aJkwUACz8=',
    'KqLe1kI1S/r1wUGaNK+nHHqqw/1QViQB/eeHF6kgEhQ=',
    '5tuWdQhfJmNdlxM+ejGYr2k3uGQLlTI4u08RbvqzjZ4=',
    '2gbuHYSRkd+94mPUmWtwx8874Dl7ZyQDx4S/HE7pZbY=',
    'j8nhHrgbdBVtnhBGYqJR65HkFPb3tlGjBnMtWIDpwzk=',
    'fHkiRzI/o94RoqZVCxOnprgZ7c83b9nAJjcSa8idkrs=',
    '6BWZn/2vP4QLC2VIBxcsUsqtIiTOTCGCiW5hLlkZjYc='
  ].map(b64dbn)
}

const wrappedRequest = {
  bl_sig_req:
    'eyJ0eXBlIjoiSXNzdWUiLCJjb250ZW50cyI6WyJCTnN3REdQZXFiSU5DN2N3WDg2VVBNRmFsTXRyNjZLWnhGbXoxc1hSMkRwVXJlTGFDMHRKVmFYMCtteUE2ZGt3VHlmbWhxZjBmd3BZUGlicGx1ekNQKzg9IiwiQkRkdjN3SmRyOTN3VC9WZFZoYWhJT1dCUVNQU3VzcnJZRVcxU3pGREN2T1BYdnd4Y2hhcGRFbUZkRGhkbktuY2VTdXFHbUtXbDFSWE15TXJiMnNvY3V3PSIsIkJDS1AyOWZaN0plNGR5SWNETWFhYXl5T08rUGFhZ2F4SE9yNitKUE9QTmMxaGFMcHlLRHVXb0M1c1BUSW8wdm45ZTM5V1plY0VKL3djTE1oMHE1blZzWT0iLCJCT2d1Vksyak1FTkYzSi9nTDc4TFJ2bk04VzdxNHorYzgwMHdwOVljS3ZtSW4yUmtNaEVaZm95VWNpdU4xU09DWnNwaDJreXdSS2Q4aG53c0hnSzJudEE9IiwiQkJ3T3FBWHJxZ0UreXAzN2VYQjZQc25vTVc0NlA3WHJOeHJvK055TnU2Q1pPZVY1MUZCeDlBa0dIOWJOL1lEL29pRXdUNmN0TGtIaE02eVFBRnBQV05NPSIsIkJJR1ovM1N6VVN0MGM2Tm0vaEo0bmxscHdLN1ppbmt5Wm5TbE1aaDVqaE1TbnA3bmtub0ZjQ3g4b2lmcFpKZzA2cE13TUYzbnpKd2p3eC9hUURjWjdTVT0iLCJCUHd5a3RObHVtZFVobFJSVXNJeFFNSG5iWW9QRGE2QmljajdrYkx1ejN5aTZ4elJvc0tOOEVCL2dEUVl0WGRpOEhWY2RjTE9pWHVyWFZTaGVDbE1jVHc9IiwiQk1sN3VBNVpOTXU1OGxOcFR0d0lWNTJwMW5GTTVwd25LTVB4TTAwL3ZSN3dlUmVDbFBVZVE3SVgyc2hEeDdsSUZLQnRmR0dFUm0relQ1VlpCSXFnTUQwPSIsIkJNU2pyU1JKZjVVOUZ2WjBOMGhIWG5IbjdvTFVyTUJQOStGK1NHc3lCWmFNV0tYOWN5VVNtVXlaZDBqSHB6V2FnRE40MW5McEs3eVBMOVcyaXRPdGQydz0iLCJCRkxXVzl0eEJuK2N3WEFkeS8xYnFJTFpVUzlRV1dmVEo3UDRjbk9FNU1HUHltSEtzNXhJKzJ1QjlXU1E2cTAwVjdGdFR1SU00amtrd0ZTK1M3M2s0YWs9Il19'
}

const issueResponse =
  'eyJzaWdzIjpbIkJDUzFOc0hoTE9hVG54UUYzUHRtK2xBVk1vOUJaeUFwWHRIVTFiZDI3bm8rQS9kTk5jKzV6QTB0WTlLY204eFREYlM3c010SHdpN01HNml5S3pQWjd5RT0iLCJCTGg2Tks5U3A3YzhCbXZNWXZkeUF6WnhrNVVnS2paTnNHN3FZRU45NUhuVnVoelNpVEJ4Rmx2eU9GZElmOUI0cW84SnFUZVVOYkxSS2R1MU82ZmpGcDQ9IiwiQkhnMGZuRWVBb1FQNlNRbVFPQmFacE5YUUVHazdLd000ckdOR01UMFNEQktZeHNkaHpNeHhIQUlNeFUwV25KcTJJVGx1MlBiZmhybXdYelJCUXd3Q3p3PSIsIkJOcVRCNGp6djlBZW0wL3BOdlA2QTVjUEZCUlVlSW9IVUZjOFQwVzVtbmJEWEMra2ZnRVRCZ1l0M0Fvb1RqU3J5Ujd0aXUyZkduME1qTkQwc2cwRUhnMD0iLCJCRUJrdmEwUnV2MW9FN1RmcDF3d3E4bnBLeHEvdjVUekZJOXNFRWg3UjBDODkxZ25udWlLWSt6a0VUOEhISXlZWmNlWWt2c3ZQcEU2bDJYRzZWc25vNjg9IiwiQkJaMSt6TTQ4K1JlOTU0aUFuNkY3TGhWOG1aUDRHVTFlbTQ5T21qdVpzSG5WN0ZQWlROa3AxUWlqY0U3dkMzNFRnb3BqUW9PZHh5RGZFR2ZhUnJHK0hzPSIsIkJGT051ejNNRWhRL2tNWGtHNnVjQmFKR0pFS09IUHFPZkd1QkxiSWJISUY2V01BczljbDRVYytuZDFCU2l6REJ3MERXTDFxR0w1Vk9ydGpzaHdyNWc0ST0iLCJCUEtXV215anp0TmZWZDgySjFITmdTaERnVTg5Mzkzd25Xd05FS2dzUDArUUxBenN1UlNJZFNXMXpZaVJQY2NhZU4vYWJrRFRPb1lMeS95OE82bFpaK009IiwiQk9vd2FXRXlXMTd5a0ZucmlDUkdDTy8xSlNvRDRNbUpDanFHRThSR1ZOTGFjMm9COWdFMTd3cmVZcmppTE1vZ1FJQkVSdnlpbnA2eEVqcnpRSnNyaVl3PSIsIkJGNGdrQUFyQTNnUUVLUXBGckRDY0IzT0p2V2J4disvU2RYRUNIdG9aM1oxaE5mMm1kWUdacHJZL05KS1Z1Z3I5akJyS3RzdTZBMzY1SXg1blpFSU04Zz0iXSwicHJvb2YiOiJZbUYwWTJndGNISnZiMlk5ZXlKUUlqb2laWGxLVTBscWIybFZXRUpJVlZNNE5HVnFUVE5WUjA1eVZsZG9SbU16VGtaT1dHeDVaRVZLZFdWcVNuWldNakZ5VVc1U1ZsWnJOSGhPUm1SelVtdDRWVlZVTUdsTVEwcEVTV3B2YVU0emNERk1la3B3V2pGV01WUlVWazlpTW1oNVpESkdVbEZWZEhaVk1sWjBUMFZzUjFkSVZuUlBSRkp2VVRKNFNFNHliRzlOYTBwR1VsUXdhV1pSUFQwaWZRPT0iLCJ2ZXJzaW9uIjoiMS4wIn0='

describe('makeIssueTokenResponse', () => {
  it('should be defined', () => {
    expect(makeIssueTokenResponse).toBeDefined()
  })
})

describe('verifyIssueTokenResponse', () => {
  it('should be possible to verify the response', () => {
    const parsed: IssueTokenResponse = b64dj(issueResponse)
    const signedPoints = parsed.sigs.map(v => b64dpt(v))
    const proof = JSON.parse(b64ds(parsed.proof).slice('batch-proof='.length))
    const P = b64dj(proof.P)
    const R = b64dbn(P.R)
    const C = b64db(P.C)

    const composites = computeComposites(
      commitment.G,
      commitment.H,
      issueTokenRequest.bP,
      signedPoints,
      h2Config
    )

    const proved = DLEQ.prove(
      commitment.G,
      commitment.H,
      composites.m,
      composites.z,
      {
        c: C,
        r: R
      }
    )

    // mess it up
    const C2 = b64db(P.C)
    C2[0] = 0xff
    C2[C2.length - 1] = 0xff

    const notProved = DLEQ.prove(
      commitment.G,
      commitment.H,
      composites.m,
      composites.z,
      {
        c: C2,
        r: R
      }
    )

    expect(proved).toBe(true)
    expect(notProved).toBe(false)
  })
})
