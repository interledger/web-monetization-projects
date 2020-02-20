// TODO: fix these storage functions
export function get(_: string) {
  return 'todo'
}

export function set(__: string, _: string) {
  return
}

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

export function requestIdentifiers() {
  return {
    'query-param': 'todo',
    'post-processed': 'todo',
    'body-param': 'todo'
  }
}

export const sentTokens: any = {}

export function tokensPerRequest() {
  return 30
}

export function issueActionUrls() {
  return []
}

export const LISTENER_URLS = 'todo'

export function maxTokens() {
  return 20
}

export const CHL_BYPASS_SUPPORT = 'todo'
export function getConfigId() {
  return 'todo'
}

export function signResponseFMT() {
  return 'string'
}

export function storedCommitments() {
  return {}
}

export function reloadOnSign() {
  return false
}

export function chlCaptchaDomain() {
  return 'todo'
}

export function setSpendFlag(_: any, __: any) {}

export function updateBrowserTab(_: any, __: any) {}

export function getConfigName() {
  return 'todo'
}

export function getCommitmentsKey() {
  return 'todo'
}
