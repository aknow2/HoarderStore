import { BaseMsg, Message, ResponseLogSettings, RetrieveLogSettings } from '../types'
import injector from './injector'
const baseMsg: BaseMsg = {
  _key: 'HoarderStore-msg',
  from: 'content_script'
}
const bridgeBrowserMsg = () => {
  const retrieveLogSettings: RetrieveLogSettings = {
    ...baseMsg,
    kind: 'settings',
    event: 'retrieve'
  }

  const init = () => {
    injector.injectJS()
    globalThis.onmessage = (ev) => {
      const msg = ev.data as Message | undefined
      if (msg?._key !== 'HoarderStore-msg' || msg.from === 'content_script') return
      const converted: Message = {
        ...msg,
        from: 'content_script'
      }
      chrome.runtime.sendMessage(converted, (res) => {
        if (res.from === 'content_script') return
        const converted: Message = {
          ...res,
          from: 'content_script'
        }
        globalThis.postMessage(converted)
      })
    }
  }

  chrome.runtime.sendMessage(retrieveLogSettings, (res: ResponseLogSettings) => {
    const { settings: { enabled, db: { allowSavedOrigin } } } = res
    const reg = new RegExp(allowSavedOrigin)
    const result = location.origin.match(reg)?.length ?? 0
    if (enabled && result > 0) {
      init()
    }
  })
}

export default bridgeBrowserMsg
