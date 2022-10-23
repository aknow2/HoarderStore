export type ConsoleProps = Extract<keyof Console, 'log' | 'error' | 'warn' | 'info' | 'assert'>

interface LogInfo {
  messages: any[]
  timestamp: number
  userAgent: string
  href: string
}
export interface ConsoleLog extends LogInfo {
  source: 'console'
  event: ConsoleProps
}

export type WindowEvents = keyof WindowEventMap
export interface WindowEventLog extends LogInfo {
  source: 'window_event'
  event: WindowEvents
}

export interface NetworkLog extends LogInfo {
  source: 'netowrk'
  event: 'finished request'
}

export type Log = ConsoleLog | WindowEventLog | NetworkLog

export interface LogSettings {
  enabled: boolean
  db: {
    limitRecord: number
    allowSavedOrigin: string
  }
  console: {
    targets: ConsoleProps[]
  }
  window: {
    targets: WindowEvents[]
  }
  network: {
    enabled: boolean
  }
}

type DeepPartial<T> = T extends {} ? T extends any[] ? T : {
  [K in keyof T]?: DeepPartial<T[K]>
} : T
export type PartialLogSettings = DeepPartial<LogSettings>

export interface BaseMsg {
  _key: 'HoarderStore-msg'
  from: 'background' | 'injected' | 'content_script' | 'action'
}

export interface AddLog extends BaseMsg {
  kind: 'log_operation'
  event: 'add'
  payload: Log
}

export interface ListOfLogs extends BaseMsg {
  kind: 'log_operation'
  event: 'list'
  payload: Log[]
}

export interface FetchListOfLogs extends BaseMsg {
  kind: 'log_operation'
  event: 'fetch_list'
  query?: {
    orderBy?: 'timestamp' | 'id'
    orderDirection?: 'desc' | 'asc'
  }
}

export type FetchListOfLogsQuery = FetchListOfLogs['query']

export interface ClearAllLogs extends BaseMsg {
  kind: 'log_operation'
  event: 'clear_all'
}

export type LogOperation = AddLog | ListOfLogs | ClearAllLogs | FetchListOfLogs

export interface SuccessMessage extends BaseMsg {
  kind: 'result'
  event: 'success'
  request: Message
}

export interface ErrorMessage extends BaseMsg {
  kind: 'result'
  event: 'error'
  reason: string
}

export interface EchoMessage extends BaseMsg {
  kind: 'echo'
  payload: Message
}

export interface RetrieveLogSettings extends BaseMsg {
  kind: 'settings'
  event: 'retrieve'
}

export interface ResponseLogSettings extends BaseMsg {
  kind: 'settings'
  event: 'response'
  settings: LogSettings
}

export interface UpdateLogSettings extends BaseMsg {
  kind: 'settings'
  event: 'update'
  settings: LogSettings
}

export type LogSettingsMsg = RetrieveLogSettings | ResponseLogSettings | UpdateLogSettings

export type Message = LogOperation | SuccessMessage | ErrorMessage | EchoMessage | LogSettingsMsg
