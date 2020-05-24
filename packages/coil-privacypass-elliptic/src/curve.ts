import * as elliptic from 'elliptic'

// TODO: secp256k1 is 4 times faster!
const p256: elliptic.ec = new elliptic.ec('p256')

export const CURVE = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  order: p256.n!,
  curve: p256.curve as elliptic.curve.base
}
