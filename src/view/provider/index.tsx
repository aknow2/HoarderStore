import { createContext, useContext, ParentComponent } from 'solid-js'
import { createStore } from 'solid-js/store'
import { BaseMsg, ClearAllLogs, FetchListOfLogs, ListOfLogs, Log, LogSettings, PartialLogSettings, ResponseLogSettings, RetrieveLogSettings, UpdateLogSettings } from '../../types'
import sendMessage from './sendMessage'
const baseMsg: BaseMsg = {
  _key: 'HoarderStore-msg',
  from: 'action'
}
type LoadingStatus = 'loading' | 'loaded'

interface StateProps<T> {
  status: LoadingStatus
  value: T
}

interface State {
  logSettings: StateProps<LogSettings | undefined>
  logs: StateProps<Log[]>
  openSettings: boolean
}

const buildStore = () => {
  const [state, setState] = createStore<State>({
    logSettings: {
      status: 'loading',
      value: undefined
    },
    logs: {
      status: 'loading',
      value: []
    },
    openSettings: false
  })
  const store = [
    state,
    {
      async fetchSettings () {
        const retrieveLogSettings: RetrieveLogSettings = {
          ...baseMsg,
          kind: 'settings',
          event: 'retrieve'
        }
        const response: ResponseLogSettings = await sendMessage(retrieveLogSettings)
        setState('logSettings', () => {
          return {
            status: 'loaded',
            value: response.settings
          }
        })
      },
      async fetchLogs () {
        const fetchLogs: FetchListOfLogs = {
          ...baseMsg,
          kind: 'log_operation',
          event: 'fetch_list',
          query: {
            orderBy: 'timestamp',
            orderDirection: 'desc'
          }
        }
        setState('logs', () => ({
          status: 'loading',
          value: []
        }))
        const response: ListOfLogs = await sendMessage(fetchLogs)
        console.log('fetch logs', response)
        setState('logs', () => ({
          status: 'loaded',
          value: response.payload
        }))
      },
      async updateSetting (settings: PartialLogSettings) {
        const { value } = state.logSettings
        if (value === undefined) {
          throw new Error('Log settings is undefined')
        }
        const { db, console, window, network } = settings
        const updateSettings: UpdateLogSettings = {
          ...baseMsg,
          kind: 'settings',
          event: 'update',
          settings: {
            enabled: settings.enabled ?? value.enabled,
            console: {
              targets: console?.targets ?? value.console.targets
            },
            db: {
              limitRecord: db?.limitRecord ?? value.db.limitRecord,
              allowSavedOrigin: db?.allowSavedOrigin ?? value.db.allowSavedOrigin
            },
            network: {
              enabled: network?.enabled ?? value.network.enabled
            },
            window: {
              targets: window?.targets ?? value.window.targets
            }
          }
        }
        setState('logSettings', () => ({
          status: 'loaded',
          value
        }))
        const response: ResponseLogSettings = await sendMessage(updateSettings)
        setState('logSettings', () => ({
          status: 'loaded',
          value: response.settings
        }))
      },
      async clearAllLogs () {
        const clearAll: ClearAllLogs = {
          ...baseMsg,
          kind: 'log_operation',
          event: 'clear_all'
        }
        await sendMessage(clearAll)
      },
      toggleSettings (open: boolean) {
        setState('openSettings', () => open)
      }
    }
  ] as const

  return store
}

type ContextStore = ReturnType<typeof buildStore>
const Context = createContext<ContextStore>()

export const ContextProvider: ParentComponent = (props) => {
  const store = buildStore()
  return (
    <Context.Provider value={store}>
      {props.children}
    </Context.Provider>
  )
}

export function useProvider () {
  const provider = useContext(Context)
  if (provider === undefined) throw new Error('Not found provider')

  return provider
}
