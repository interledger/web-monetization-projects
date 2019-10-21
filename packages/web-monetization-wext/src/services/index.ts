import { decorate, injectable, unmanaged } from 'inversify'

import { StorageService } from './StorageService'

export * from './HistoryDb'
export * from './StorageService'

/**
 * The popup uses this class, yet inversify is a bit
 * weighty causing some lag in the popup opening.
 */
function decorateStorageService() {
  decorate(injectable(), StorageService)
  decorate((unmanaged() as unknown) as ParameterDecorator, StorageService, 0)
  decorate((unmanaged() as unknown) as ParameterDecorator, StorageService, 1)
}

decorateStorageService()
