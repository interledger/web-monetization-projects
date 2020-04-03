// TODO: manage config like this
export function sendH2CParams() {
  return false
}

export interface H2CParams {
  method: string
  curve: string
  hash: string
}

export function h2cParams(): H2CParams {
  return {
    curve: 'p256',
    hash: 'sha256',
    method: 'increment'
  }
}
