import { BaseMsg, AddLog, Message, RetrieveLogSettings } from '../../types'
import { Context, Repository } from './types'
import msgPattern from './msg_pattern'
const baseMsg: BaseMsg = {
  _key: 'HoarderStore-msg',
  from: 'injected'
}

const repository: Repository = {
  log (ev) {
    const msg: AddLog = {
      ...baseMsg,
      kind: 'log_operation',
      event: 'add',
      payload: ev
    }
    globalThis.postMessage(msg)
  },
  init () {
    const retrieveLogSettings: RetrieveLogSettings = {
      ...baseMsg,
      kind: 'settings',
      event: 'retrieve'
    }
    globalThis.postMessage(retrieveLogSettings)
  }
}
const run = () => {
  let ctx: Context = {
    repository,
    resetHook: undefined
  }
  globalThis.addEventListener('message', (ev) => {
    const msg = ev.data as Message | undefined
    if (msg?._key !== 'HoarderStore-msg' || msg.from === 'injected') return
    ctx = msgPattern.match({ ...ev.data, ctx })
  })

  repository.init()
}
run()

export default function () {}
