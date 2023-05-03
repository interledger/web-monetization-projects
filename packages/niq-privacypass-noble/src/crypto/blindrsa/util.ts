import { modPow } from './modular'

function assertNever(name: string, x: unknown): never {
  throw new Error(`unexpected ${name} identifier: ${x}`)
}

interface HashParams {
  name: string
  hLen: number
}

function getHashParams(hash: string): HashParams {
  switch (hash) {
    case 'SHA-1':
      return { name: hash, hLen: 20 }
    case 'SHA-256':
      return { name: hash, hLen: 32 }
    case 'SHA-384':
      return { name: hash, hLen: 48 }
    case 'SHA-512':
      return { name: hash, hLen: 64 }
    default:
      assertNever('Hash', hash)
  }
}

export function os2ip(bytes: Uint8Array): bigint {
  return bytes.reduce((result, byte) => (result << 8n) + BigInt(byte), 0n)
}

export function i2osp(num: bigint, byteLength: number): Uint8Array {
  if (num >= 1n << (BigInt(byteLength) * 8n)) {
    throw new Error(`number does not fit in ${byteLength} bytes`)
  }

  const bytes = new Uint8Array(byteLength)
  let index = byteLength - 1

  while (num > 0n) {
    bytes[index as number] = Number(num & 0xffn)
    num >>= 8n
    index -= 1
  }

  return bytes
}

export function joinAll(a: Uint8Array[]): Uint8Array {
  let size = 0
  for (let i = 0; i < a.length; i++) {
    size += a[i as number].length
  }
  const ret = new Uint8Array(new ArrayBuffer(size))
  for (let i = 0, offset = 0; i < a.length; i++) {
    ret.set(a[i as number], offset)
    offset += a[i as number].length
  }
  return ret
}

export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.length !== b.length || a.length === 0) {
    throw new Error('arrays of different length')
  }
  const n = a.length
  const c = new Uint8Array(n)
  for (let i = 0; i < n; i++) {
    c[i as number] = a[i as number] ^ b[i as number]
  }
  return c
}

function incCounter(c: Uint8Array) {
  c[3]++
  if (c[3] != 0) {
    return
  }
  c[2]++
  if (c[2] != 0) {
    return
  }
  c[1]++
  if (c[1] != 0) {
    return
  }
  c[0]++
}

type MGFFn = (
  h: HashParams,
  seed: Uint8Array,
  mLen: number
) => Promise<Uint8Array>

// MGF1 (mgfSeed, maskLen)
//
// https://www.rfc-editor.org/rfc/rfc8017#appendix-B.2.1
//
// Options:
// Hash     hash function (hLen denotes the length in octets of
//          the hash function output)
//
// Input:
// mgfSeed  seed from which mask is generated, an octet string
// maskLen  intended length in octets of the mask, at most 2^32 hLen
//
// Output:
// mask     mask, an octet string of length maskLen
//
// Error: "mask too long"
async function mgf1(
  h: HashParams,
  seed: Uint8Array,
  mLen: number
): Promise<Uint8Array> {
  // 1.  If maskLen > 2^32 hLen, output "mask too long" and stop.
  const n = Math.ceil(mLen / h.hLen)
  if (n > Math.pow(2, 32)) {
    throw new Error('mask too long')
  }

  // 2.  Let T be the empty octet string.
  let T = new Uint8Array()

  // 3.  For counter from 0 to \ceil (maskLen / hLen) - 1, do the
  //     following:
  const counter = new Uint8Array(4)
  for (let i = 0; i < n; i++) {
    //     A.  Convert counter to an octet string C of length 4 octets (see
    //         Section 4.1):
    //
    //            C = I2OSP (counter, 4) .
    //     B.  Concatenate the hash of the seed mgfSeed and C to the octet
    //         string T:
    //
    //            T = T || Hash(mgfSeed || C) .
    const hash = new Uint8Array(
      await crypto.subtle.digest(h.name, joinAll([seed, counter]))
    )
    T = joinAll([T, hash])
    incCounter(counter)
  }

  // 4.  Output the leading maskLen octets of T as the octet string mask.
  return T.subarray(0, mLen)
}

// EMSA-PSS-ENCODE (M, emBits)
//
// https://www.rfc-editor.org/rfc/rfc3447.html#section-9.1.1
//
// Input:
// M        message to be encoded, an octet string
// emBits   maximal bit length of the integer OS2IP (EM) (see Section
//          4.2), at least 8hLen + 8sLen + 9
// MGF      mask generation function
//
// Output:
// EM       encoded message, an octet string of length emLen = \ceil
//          (emBits/8)
//
// Errors:  "encoding error"; "message too long"
export async function emsa_pss_encode(
  msg: Uint8Array,
  emBits: number,
  opts: {
    hash: string
    sLen: number
  },
  mgf: MGFFn = mgf1
): Promise<Uint8Array> {
  const { hash, sLen } = opts
  const hashParams = getHashParams(hash)
  const { hLen } = hashParams
  const emLen = Math.ceil(emBits / 8)

  // 1.  If the length of M is greater than the input limitation for the
  //     hash function (2^61 - 1 octets for SHA-1), output "message too
  //     long" and stop.
  //
  // 2.  Let mHash = Hash(M), an octet string of length hLen.
  const mHash = new Uint8Array(await crypto.subtle.digest(hash, msg))
  // 3.  If emLen < hLen + sLen + 2, output "encoding error" and stop.
  if (emLen < hLen + sLen + 2) {
    throw new Error('encoding error')
  }
  // 4.  Generate a random octet string salt of length sLen; if sLen = 0,
  //     then salt is the empty string.
  const salt = crypto.getRandomValues(new Uint8Array(sLen))
  // 5.  Let
  //       M' = (0x)00 00 00 00 00 00 00 00 || mHash || salt;
  //
  //     M' is an octet string of length 8 + hLen + sLen with eight
  //     initial zero octets.
  //
  const mPrime = joinAll([new Uint8Array(8), mHash, salt])
  // 6.  Let H = Hash(M'), an octet string of length hLen.
  const h = new Uint8Array(await crypto.subtle.digest(hash, mPrime))
  // 7.  Generate an octet string PS consisting of emLen - sLen - hLen - 2
  //     zero octets. The length of PS may be 0.
  const ps = new Uint8Array(emLen - sLen - hLen - 2)
  // 8.  Let DB = PS || 0x01 || salt; DB is an octet string of length
  //     emLen - hLen - 1.
  const db = joinAll([ps, Uint8Array.of(0x01), salt])
  // 9.  Let dbMask = MGF(H, emLen - hLen - 1).
  const dbMask = await mgf(hashParams, h, emLen - hLen - 1)
  // 10. Let maskedDB = DB \xor dbMask.
  const maskedDB = xor(db, dbMask)
  // 11.  Set the leftmost 8emLen - emBits bits of the leftmost octet
  //      in maskedDB to zero.
  maskedDB[0] &= 0xff >> (8 * emLen - emBits)
  // 12.  Let EM = maskedDB || H || 0xbc.
  const em = joinAll([maskedDB, h, Uint8Array.of(0xbc)])

  // 13. Output EM.
  return em
}

export function rsavp1(pkS: { n: bigint; e: bigint }, s: bigint): bigint {
  // 1. If the signature representative s is not between 0 and n - 1,
  //    output "signature representative out of range" and stop.
  if (s < 0n || s >= pkS.n) {
    throw new Error('signature representative out of range')
  }

  // 2. Let m = s^e mod n.
  const m = modPow(s, pkS.e, pkS.n)

  // 3. Output m.
  return m
}

export function rsasp1(skS: { n: bigint; d: bigint }, m: bigint): bigint {
  // 1. If the message representative m is not between 0 and n - 1,
  //    output "message representative out of range" and stop.
  if (m < 0n || m >= skS.n) {
    throw new Error('message representative out of range')
  }

  // 2. The signature representative s is computed as follows.
  //
  //    a. If the first form (n, d) of K is used, let s = m^d mod n.
  const s = modPow(m, skS.d, skS.n)

  // 3. Output s.
  return s
}

function normalize(base64url: string) {
  return (
    base64url.replace(/-/g, '+').replace(/_/g, '/') +
    '='.repeat((4 - (base64url.length % 4)) % 4)
  )
}

export function base64urlToBigInt(base64url: string): bigint {
  // Convert base64url to base64
  const base64 = normalize(base64url)

  // Decode base64 to Uint8Array
  const binaryString = atob(base64)
  const bytes = new Uint8Array(
    [...binaryString].map(char => char.charCodeAt(0))
  )

  // Convert Uint8Array to bigint
  return os2ip(bytes)
}
