import initPattern from '../pattern'
import { BaseMsg, ErrorMessage, ListOfLogs, LogOperation, LogSettings, LogSettingsMsg, Message, ResponseLogSettings, SuccessMessage } from '../types'
import repo from './repository'

const baseMsg: BaseMsg = {
  _key: 'HoarderStore-msg',
  from: 'background'
} as const

const settingsPattern = initPattern<LogSettingsMsg, Promise<LogSettings>>()
  .setup('event')
  .map({
    async retrieve () {
      console.log('Retrieve log settings')
      return await repo.getLogSettings()
    },
    async update (msg) {
      console.log('Update log settings')
      return await repo.putLogSettings(msg.settings)
    }
  })
  .orElse((msg) => { throw new Error(`Not supported settings event ${msg.event}`) })

const msgPattern = initPattern<Message, Promise<Message | undefined>>()
  .setup('kind')
  .map({
    log_operation: async (msg) => {
      console.log('log operation', msg)
      return await logOperationPattern.match(msg)
    },
    settings: async (msg): Promise<ResponseLogSettings | SuccessMessage> => {
      console.log('Log settings', msg)
      const settings = await settingsPattern.match(msg)
      return {
        ...baseMsg,
        kind: 'settings',
        event: 'response',
        settings
      }
    }
  })
  .orElse(async (msg) => {
    console.log('Not match msg pattern', msg)
    return await Promise.resolve(undefined)
  })

const logOperationPattern = initPattern<LogOperation, Promise<Message>>()
  .setup('event')
  .map({
    async add (msg) {
      return await repo
        .insertLog(msg.payload)
        .then((): SuccessMessage => ({
          ...baseMsg,
          kind: 'result',
          event: 'success',
          request: msg
        }))
    },
    async fetch_list ({ query }): Promise<ListOfLogs> {
      console.log('fetch list')
      const logs = await repo.fetchLogs(query)
      return {
        ...baseMsg,
        kind: 'log_operation',
        event: 'list',
        payload: logs
      }
    },
    async clear_all (msg): Promise<SuccessMessage> {
      console.log('clear list')
      await repo.clearLogs()
      return {
        ...baseMsg,
        kind: 'result',
        event: 'success',
        request: msg
      }
    },
    async list (msg): Promise<SuccessMessage> {
      return await Promise.resolve({
        ...baseMsg,
        kind: 'result',
        event: 'success',
        request: msg
      })
    }
  })

chrome.runtime.onMessage.addListener(function (msg: Message | null, _, response) {
  if ((msg == null) || msg.from === 'background') {
    console.log('ignore', msg)
    return
  }
  console.log('onMessage', msg)
  const promise = msgPattern.match(msg)
  promise.then((msg) => {
    if (msg != null) {
      console.log('response with', msg)
      response(msg)
    }
  }).catch((e): ErrorMessage => {
    return {
      ...baseMsg,
      kind: 'result',
      event: 'error',
      reason: e.message
    }
  })
  return true
})
