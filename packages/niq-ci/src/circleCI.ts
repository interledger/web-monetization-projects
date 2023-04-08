import { removeCommonIndentation } from './removeCommonIndentation'

export interface CircleCIConfig {
  version: string
  jobs: Record<string, Job>
  workflows: Workflows
}

export interface Parameter {
  type: ParameterType
  default?: string | number | boolean | Array<string>
  enum?: Array<string>
}

export enum ParameterType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Enum = 'enum'
}

export interface Job {
  [key: string]: any

  macos?: {
    xcode: string
  }
  steps?: Array<Step>
  resource_class?: string
  docker?: Array<{ image: DockerImage | string }>
  parameters?: Record<string, Parameter>
  matrix?: {
    parameters: Record<string, Array<string>>
  }
}

export interface RunStep {
  run: { name: string; command: string }
}

export interface RestoreCacheStep {
  restore_cache: { keys: Array<string> }
}

export interface SaveCacheSTep {
  save_cache: { paths: Array<string>; key: string }
}

export type Step =
  | 'checkout'
  | RestoreCacheStep
  | SaveCacheSTep
  | RunStep
  | Record<string, any>

export interface Workflows {
  version: number
  build: {
    jobs: Array<string | Record<string, unknown>>
  }
}

export enum DockerImage {
  Node = 'cimg/node'
}

export interface EnumParameter extends Parameter {
  type: ParameterType.Enum
  enum: Array<string>
}

export const parameterizedNodeVersion: Job = {
  parameters: {
    'node-version': {
      type: ParameterType.String,
      default: '16.19.0'
    }
  },
  docker: [
    { image: DockerImage.Node + ':<< parameters.node-version >>-browsers' }
  ]
}

export function step(name: string, command: string): RunStep {
  const formattedCommand = removeCommonIndentation(command)
  return {
    run: {
      name,
      command: formattedCommand
    }
  }
}

export interface CacheSteps {
  restoreStep: RestoreCacheStep
  saveStep: SaveCacheSTep
}

export function cache(cacheKey: string): CacheSteps {
  return {
    restoreStep: {
      restore_cache: {
        keys: [cacheKey]
      }
    },
    saveStep: {
      save_cache: {
        paths: ['node_modules', '.yarn', 'puppeteer-cache'],
        key: cacheKey
      }
    }
  }
}

interface JobUnboundParams {
  cacheSteps: CacheSteps
  baseJob: Job
  baseSteps: Job[]
}

export function jobUnbound(
  innerSteps: Step[],
  { cacheSteps, baseJob, baseSteps }: JobUnboundParams
): Job {
  const usedCache = cacheSteps
  return {
    ...baseJob,
    steps: [
      'checkout',
      usedCache.restoreStep,
      ...baseSteps,
      ...innerSteps,
      usedCache.saveStep
    ]
  }
}
