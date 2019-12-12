import { randomBytes } from 'crypto'

import { BigInteger } from 'jsbn'

export type hexString = string

export function getBlindingFactor(n: BigInteger): BigInteger {
  let blindingFactor: BigInteger
  const bytesLength = Buffer.from(n.toString(16), 'hex').length
  do {
    const hexBytes = randomBytes(bytesLength).toString('hex')
    blindingFactor = new BigInteger(hexBytes, 16)
    // TODO: maybe change this to constant time compare? could leak small
    // amount about timingAttackBlinding
  } while (
    blindingFactor.compareTo(n) >= 0 ||
    blindingFactor.compareTo(BigInteger.ONE) <= 0
  )
  return blindingFactor
}

export interface BlindParams {
  n: hexString
  e: number
  messageHash: hexString
}

export interface BlindResult {
  blindedMessageHash: hexString
  blindingFactor: hexString
}

export function blindMessageHash(params: BlindParams): BlindResult {
  const n = new BigInteger(params.n, 16)
  const messageHash = new BigInteger(params.messageHash, 16)

  const blindingFactor = getBlindingFactor(n)
  const blindingFactorE = blindingFactor.modPowInt(params.e, n)
  const blindedMessageHash = blindingFactorE
    .multiply(messageHash)
    .mod(n)
    .toString(16)

  return {
    blindedMessageHash,
    blindingFactor: blindingFactor.toString(16)
  }
}

export interface UnblindParams {
  n: hexString
  blindingFactor: hexString
  blindSignature: hexString
}

export function unblindBlindSignature(params: UnblindParams): hexString {
  const n = new BigInteger(params.n, 16)
  const blindingFactor = new BigInteger(params.blindingFactor, 16)
  const blindSignature = new BigInteger(params.blindSignature, 16)

  const blindingFactorInverse = blindingFactor.modInverse(n)
  const unblindedSignature = blindSignature
    .multiply(blindingFactorInverse)
    .mod(n)
    .toString(16)

  return unblindedSignature
}
