import { Log, LogSettings } from '../../types'

export interface Context {
  resetHook?: () => void
  repository: Repository
  settings?: LogSettings
}

export type WithContext<T> = T & {
  ctx: Context
}

export interface Repository {
  log: (data: Log) => void
  init: () => void
}
