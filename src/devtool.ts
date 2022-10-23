import { AddLog, BaseMsg, NetworkLog, ResponseLogSettings, RetrieveLogSettings } from './types'

const baseMsg: BaseMsg = {
  _key: 'HoarderStore-msg',
  from: 'action'
}

const listenNetwork = () => {
  chrome.devtools.network.onRequestFinished.addListener((req) => {
    const reqObj = JSON.parse(JSON.stringify(req))
    const payload: NetworkLog = {
      source: 'netowrk',
      event: 'finished request',
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      href: location.href,
      messages: [reqObj]
    }
    const msg: AddLog = {
      ...baseMsg,
      kind: 'log_operation',
      event: 'add',
      payload
    }
    chrome.runtime.sendMessage(msg)
      .then()
      .catch((e) => console.error(e))
  })
}

chrome.devtools.panels.create('HoarderStore', '', 'index.html', () => {
  const retrieveLogSettings: RetrieveLogSettings = {
    ...baseMsg,
    kind: 'settings',
    event: 'retrieve'
  }
  chrome.runtime.sendMessage(retrieveLogSettings, (res: ResponseLogSettings) => {
    const { settings: { enabled, network } } = res
    if (enabled && network.enabled) {
      listenNetwork()
    }
  })
})

export default function () {}
