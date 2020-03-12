export function dev() {
  return true
}

// TODO: manage config like this
export function sendH2CParams() {
  return false
}

export function h2cParams() {
  return {
    curve: 'p256',
    hash: 'sha256',
    method: 'increment'
  }
}
