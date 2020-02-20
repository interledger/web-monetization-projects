import { BigNumber, SjclEllipticalPoint } from 'sjcl'

import { newRandomPoint, blindPoint, sec1EncodeToBase64 } from './crypto'

export interface BlindToken {
  data: any
  point: BigNumber
  blind: BigNumber
}

export function CreateBlindToken(): BlindToken | void {
  const randomPoint = newRandomPoint()

  if (randomPoint) {
    const blindedPoint = blindPoint(randomPoint)
    return {
      data: randomPoint.data,
      point: blindedPoint.point,
      blind: blindedPoint.blind
    }
  }
}

export function GenerateNewTokens(n: number) {
  const tokens: BlindToken[] = []

  for (let i = 0; i < n; ++i) {
    const blindToken = CreateBlindToken()

    if (!blindToken) {
      console.warn(
        '[privacy pass]: tried to generate a random point on the curve, but failed'
      )
      console.warn('[privacy pass]: will drop the null point')
      continue
    }

    tokens.push(blindToken)
  }

  return tokens
}

export interface StorableBlindToken {
  data: any
  point: string
  blind: string
}

export function getTokenEncoding(
  t: BlindToken,
  curvePoint: SjclEllipticalPoint
): StorableBlindToken {
  const storablePoint = sec1EncodeToBase64(curvePoint, false)
  const storableBlind = t.blind.toString()

  return {
    data: t.data,
    point: storablePoint,
    blind: storableBlind
  }
}

// TODO: storeTokens
// TODO: storeNewTokens
// TODO: loadTokens
// TODO: countStoredTokens
