import { describe, expect, jest, test } from '@jest/globals'

import * as blindRSA from '../../../../src/crypto/blindrsa/blindrsa'

// Test vector
// https://www.ietf.org/archive/id/draft-irtf-cfrg-rsa-blind-signatures-03.html#appendix-A
import { mod, modInv } from '../../../../src/crypto/blindrsa/modular'

import vectors from './testdata/rsablind_vectors.json'

function hexToB64URL(x: string): string {
  if (x.length % 2 === 1) {
    x = '0' + x
  }
  const hexBuffer = Buffer.from(x, 'hex')
  // noinspection TypeScriptValidateJSTypes
  return hexBuffer.toString('base64url')
}

function bnToB64Url(x: bigint) {
  return hexToB64URL(x.toString(16))
}

function hexToUint8(x: string): Uint8Array {
  if (x.length % 2 === 1) {
    x = '0' + x
  }
  return new Uint8Array(Buffer.from(x, 'hex'))
}

type Vectors = (typeof vectors)[number]

function paramsFromVector(v: Vectors): {
  n: string
  e: string
  d: string
  p: string
  q: string
  dp: string
  dq: string
  qi: string
} {
  const n = hexToB64URL(v.n)
  const e = hexToB64URL(v.e)
  const d = hexToB64URL(v.d)
  const p = hexToB64URL(v.p)
  const q = hexToB64URL(v.q)

  // Calculate CRT values
  const bnD = BigInt(`0x${v.d}`)
  const bnP = BigInt(`0x${v.p}`)
  const bnQ = BigInt(`0x${v.q}`)
  const one = BigInt(1)
  const dp = bnToB64Url(mod(bnD, bnP - one))
  const dq = bnToB64Url(mod(bnD, bnQ - one))
  const qi = bnToB64Url(modInv(bnQ, bnP))
  return { n, e, d, p, q, dp, dq, qi }
}

async function keysFromVector(
  v: Vectors,
  extractable: boolean
): Promise<CryptoKeyPair> {
  const params = paramsFromVector(v)
  const { n, e } = params
  const publicKey = await crypto.subtle.importKey(
    'jwk',
    { kty: 'RSA', ext: true, n, e },
    { name: 'RSA-PSS', hash: 'SHA-384' },
    extractable,
    ['verify']
  )

  const privateKey = await crypto.subtle.importKey(
    'jwk',
    { kty: 'RSA', ext: true, ...params },
    { name: 'RSA-PSS', hash: 'SHA-384' },
    extractable,
    ['sign']
  )
  return { privateKey, publicKey }
}

describe('paramsFromVector', () => {
  test('should match old impl', () => {
    const loggedFromOld = {
      n: 'rsTWmt3HC5kOpmpecGA7b-4nqv69CPLZTL4SUMVW4EepKNY1w_Re6bZtG8YooDusm3w_QW_iDavqjz17S79_ljvjNdIyjWfmwT7kqPlV4Foyg3INPh8TnDjkPgM4rQWKlJXFM3f8Nb5k0gj4m0qnIb9_fT_vg3viqA4Pit8LzR7sW7BARDorJ5L9ylIqdHKu108xoevh7rwfQIZgoFQ9_iqFDxBqYX7GaFVzcC6qohpWQKXcr5t045f6OvGKLxt8A7qRpjNhWN5CDWMYjuFDhm7kFXNdFVt8LYVNeVt7wjbP_XFULfNCNCIaBBPhQtjGE1XMRNRb2pQgSXRVesJwTNi1k_A1pXJLGt9ELnjFQs1EFPzm8SmBgvttjlPO8a39LpDh5N7sUpmb3GwpFE6NUqElIyyMbXXHBuo8wGhBx72jNWjGOmwDgX9yK1D8-JgjfXiKRACGnkTZCjAgkj3GRjiKvMkUMVIV_NG64RscdR_VJEOqyPYBCH2NQnN8GKP6EezUEx7K4BeuChSs_E74W4PBn-0zz9HNYp2ixMCeIis5jhjYIvd7s3jeo8s2C2BeWqWLIO3CnQAKZr0XfGgqF-frEqY-98LkGD4NiY89a_VnuoroT4Tx0jv4uOJhw3KeL6bQe4MuB83dHRT1UyXG-SQmeVcSGQLcGbOzKUi96tU',
      e: 'AQAB',
      d: 'DUMkKu_h-ywT-8ZuILZ4xDNtILGAjFWLbmKtFqKHB3GAsXfh8BsS-cbNbFJjAlfM7yakUTWpkJKHc_O9L8AaMT8drJelHOxxyx_X78et_96wXx-wSBLJJO1_SoJpkl2tiL19z7xO8BAg6_xgyz4ExU-YH9vSc-aaili4zrfC2D-8vW94TQUiAbiKmEgYbypFwNKCaHBzPm_ZqkaYPgpuguNcogpDnF7ntQKpBi4QZkk72t-LSesw2VWO2Fq8evsps8m8ZEGZZUpGdmga9Lq86k5vcf5FZcnBuF2ZhbhOwavxqCCpu-vuDfE5iq4shatYCp8T53Q6_TEI6zIQC4cGSPprwX6KusTTyZJGsfDqn3-Tpd1UWMVtnz-B_yIWs8NoChNZFnPEMZTY5vyT_B43zimGvWKKxICIvHI9j74pOGHKep9Kc-n6Y7G20AdPXeoqYkxSSf862BG2JVspnWvFRRunR38ZxaDbaQw-ZHY5ixSD0QMUr9OLuvbi-9vNYsPKl5ekIMpgNOwKgzYKPuKt9LnUuilzHRMbCZo41qI8xGPbdUYDIRJg6Z0Zr_yQLJFdeFRVSqv2COOsUsGbiqJq4EIkmxey0pZptchZED7lPvm9xzujxrU31cNLbY8DRnHX86imlmzEVD3yI1ZTQxVBQP1zkcfnvgPiQfTs_rh3oFE',
      p: '4fTXo0gC4nxzkqPOoyomKjTcNpG9h_PzENx1ZzSIkwVZwSD9BBAZT7ig2lW9C4EifoQ_3KZpKugOWl1BQRbUgD_KfYww6qrlfkShgW67XFsGBsU2JGx_EZhdcxaEFQtjyaOtnkGwTAtbJ8sYimkshGlrdCqA080Aq4kfJFdEPa3-um1trxCGAr4m1wcYA8ZxBaVCaDjmiJ136EdLKSRM769BjjgbMSBItFfXNBkhMGPGDuew2BggFlhk_vk1I8ljXCIhCVblOo2WMiST_8WNhFNo4kFuB45by10v1ormrPpU-WJ8QuhKnT8ndAF-MuvKBjCKEuzCkMfNEVbczPsjEQ',
      q: 'xgGpyupm3Dg1gntTnbnfb29a53JEaSeAzTNKAGqzU8gGQmtgcYwFJFZQgh05RF06tZHtEKcznxXYP-E_aj37ILlFLGqbQuqmKmjJcN88rbITn4BK2CI9VhCN_eMLp9Nn6bCnqAxP26L9nd5mYfxz_ClHVp0gKfKHD8AtgyWs8oya-hns-WLap5FuIa-tCeti_p8c-Rt33IebeXS0kNPr0ulUJgV_NdCjyfRfeaxyergaUZqLkoWTLZsuXM00flnz8yrZyjWRFefaAIq3QGcHvQ6OGFpe2HWLW6Jm6IKPjYY64TOEYwSik2rXvHyYA4edL8SijmkpHXPb15n4vCODhQ',
      dp: 'FjwSsCWY6xKWCNsHrXSrVsHm3ZPP074EsCcRgntf6R_AqkmFvE2dQAQKCBIhzS0C6PI4mozhknBNYUUF89K8THZ6hYozEhSJCrjUL7lmxHrMiAQGBOWMR333zChuDOgXBLOPlSAfqgwAB1Vr78rTr5_0C_VWwgDNTRPsNZZEx9EEXPIBthVpKoHtroErMsvnOUf-1eSrgswEDZ5eXgkNbRSQ3d7VhisIHH78VUsXwfw_dB4Gf-030xsVrSV2vjPGDD3rhFDBs9ZU7lA9JBEbkOboTkNkAWhXzhY4a-M1OdZUYEn5slfLZ9fcGQVAluAu_Bbwr1YO-1I98rPafG1GEQ',
      dq: 'YyWSD7kvqDW9FYkLZX8dEn9_1USyXLUbGaUE-RB0mw8dk0SRFko2iOtvhLd9ZW4JZ8GaIyyV_KLDlbkEN_6xMMGUkZkQBYHZkoLF227sw0zX5pYm4_LBI8dGUkrOG0sQTUPXr536ntAOjm4-dfIjYbCJuCUVZeu7FXf1UiYbY5hkQbeZoYaOVjnMG7ILw1vKRhUGPPY0HokIoNh_UcXL3-BV8nPuLtQ6L3XeGN7ws-Jby2DHYqbf-4YowO8_ycThEnHye_42l_Fwh7Tt7aGpjlErdaZKt7ij_05imSpHF2aPNRTGxY4cmhR10jvRInNVkgW0H_soS0coXd0LX6mowQ',
      qi: 'lcjulSWA0KWM3ACEFVir7U2c_hSdjr42crhe0WwDKZKiYVy8Gl5kMTbdBdKXWnZ_eEgiB7cAhKcbMg6y6Kaxq3Yj0HZaKEjq6nbPvZnzKYvHX9d6F9taWFg8DoyTTUsH2Ak1mVFBhzEMJuty0Qc_f_Na2YZQSA9AUMqzwrbDo1dsR2YcEzJvA5STKJw2dAKmOgPviLQSumYkHFwE6LjUbaeYa5AkCTvi--mlNjQ30xX01TwZ9uGRj47iG9xrx_Gk1tVeowhPTCdTpR9hyQsayTXylDaLPKexmWnlCpYmR6msYhgTOe1MYCAZcIocU80hl6FCLg9L-0NGBX_5m2gfKg'
    }
    expect(paramsFromVector(vectors[0])).toEqual(loggedFromOld)
  })
})

describe.each(vectors)('BlindRSA-vec$#', (v: Vectors) => {
  test('test-vector', async () => {
    const r_inv = BigInt(`0x${v.inv}`)
    const r = modInv(r_inv, BigInt(`0x${v.n}`))
    const r_bytes: Uint8Array = hexToUint8(r.toString(16))

    const { privateKey, publicKey } = await keysFromVector(v, true)
    const msg = hexToUint8(v.msg)
    const saltLength = v.salt.length / 2

    // Mock for randomized blind operation.
    jest
      .spyOn(crypto, 'getRandomValues')
      .mockReturnValueOnce(hexToUint8(v.salt)) // mock for random salt
      .mockReturnValueOnce(r_bytes) // mock for random blind

    const { blindedMsg, blindInv } = await blindRSA.blind(
      publicKey,
      msg,
      saltLength
    )
    expect(blindedMsg).toStrictEqual(hexToUint8(v.blinded_msg))
    expect(blindInv).toStrictEqual(hexToUint8(v.inv))

    const blindedSig = await blindRSA.blindSign(privateKey, blindedMsg)
    expect(blindedSig).toStrictEqual(hexToUint8(v.blind_sig))

    const signature = await blindRSA.finalize(
      publicKey,
      msg,
      blindInv,
      blindedSig,
      saltLength
    )
    expect(signature).toStrictEqual(hexToUint8(v.sig))
  })

  test('non-extractable-keys', async () => {
    const { privateKey, publicKey } = await keysFromVector(v, false)
    const msg = crypto.getRandomValues(new Uint8Array(10))
    const blindedMsg = crypto.getRandomValues(new Uint8Array(32))
    const blindInv = crypto.getRandomValues(new Uint8Array(32))
    const blindedSig = crypto.getRandomValues(new Uint8Array(32))
    const errorMsg = 'key is not extractable'

    // noinspection DuplicatedCode
    await expect(blindRSA.blind(publicKey, msg, 32)).rejects.toThrow(errorMsg)
    await expect(blindRSA.blindSign(privateKey, blindedMsg)).rejects.toThrow(
      errorMsg
    )
    await expect(
      blindRSA.finalize(publicKey, msg, blindInv, blindedSig, 32)
    ).rejects.toThrow(errorMsg)
  })

  test('wrong-key-type', async () => {
    const { privateKey, publicKey } = await crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5', // not RSA-PSS.
        modulusLength: 2048,
        publicExponent: Uint8Array.from([0x01, 0x00, 0x01]),
        hash: 'SHA-256'
      },
      true,
      ['sign', 'verify']
    )

    const msg = crypto.getRandomValues(new Uint8Array(10))
    const blindedMsg = crypto.getRandomValues(new Uint8Array(32))
    const blindInv = crypto.getRandomValues(new Uint8Array(32))
    const blindedSig = crypto.getRandomValues(new Uint8Array(32))
    const errorMsg = 'key is not RSA-PSS'

    // noinspection DuplicatedCode
    await expect(blindRSA.blind(publicKey, msg, 32)).rejects.toThrow(errorMsg)
    await expect(blindRSA.blindSign(privateKey, blindedMsg)).rejects.toThrow(
      errorMsg
    )
    await expect(
      blindRSA.finalize(publicKey, msg, blindInv, blindedSig, 32)
    ).rejects.toThrow(errorMsg)
  })
})
