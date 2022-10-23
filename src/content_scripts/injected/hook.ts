import { ConsoleLog, ConsoleProps, WindowEventLog, LogSettings, WindowEvents } from '../../types'
import { Repository } from './types'

export const bindConsole = (prop: ConsoleProps, repository: Repository) => {
  const defaultFunc: any = console[prop].bind(console)
  console[prop] = (...data: any) => {
    defaultFunc(data)
    const ev: ConsoleLog = {
      source: 'console',
      event: 'log',
      messages: data,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      href: location.href
    }
    repository.log(ev)
  }
  return () => {
    console[prop] = defaultFunc
  }
}

export const hookConsole = (repo: Repository, settings: LogSettings) => {
  const { console: { targets } } = settings
  const resets = targets.map((target) => bindConsole(target, repo))
  return () => {
    resets.forEach((r) => r())
  }
}

const bindWindowEvent = (repo: Repository, event: WindowEvents) => {
  const listener = (ev: Event) => {
    const log: WindowEventLog = {
      source: 'window_event',
      event,
      messages: [JSON.stringify(ev)],
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      href: location.href
    }
    repo.log(log)
  }
  globalThis.addEventListener(event, listener)
  return () => {
    globalThis.removeEventListener(event, listener)
  }
}

export const hookError = (repo: Repository, settings: LogSettings) => {
  const { targets } = settings.window
  const resets = targets.map((target) => bindWindowEvent(repo, target))

  return () => {
    resets.forEach(reset => reset())
  }
}
