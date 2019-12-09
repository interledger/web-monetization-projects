import { Injectable } from '@dier-makr/annotations'

export const ClientModule = Symbol.for('@coil/client')
export const injectable = Injectable(ClientModule)
