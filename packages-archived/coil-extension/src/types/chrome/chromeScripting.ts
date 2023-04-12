export type RunAt = 'document_start' | 'document_end' | 'document_idle'
export type ExecutionWorld = 'ISOLATED' | 'MAIN'

export interface RegisteredContentScript {
  id: string
  allFrames?: boolean
  css?: string[]
  excludeMatches?: string[]
  js?: string[]
  matches?: string[]
  persistAcrossSessions?: boolean // default true
  runAt?: RunAt
  world?: ExecutionWorld
}

export interface ContentScriptFilter {
  ids: string[]
}

export interface ChromeScripting {
  registerContentScripts(
    scripts: RegisteredContentScript[],
    callback?: (error?: Error) => void
  ): Promise<void>

  getRegisteredContentScripts(
    filter?: ContentScriptFilter,
    callback?: (scripts: RegisteredContentScript) => void
  ): Promise<RegisteredContentScript[]>
}
