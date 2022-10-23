import pattern from './pattern'
import { LogSettingsMsg, Message, ResponseLogSettings } from '../../types'
import { hookConsole, hookError } from './hook'
import { Context, WithContext } from './types'

const toggleEnabledExtension = (msg: WithContext<ResponseLogSettings>) => {
  const { settings, ctx } = msg
  const { settings: oldSettings } = ctx
  if (settings.enabled !== oldSettings?.enabled) {
    if (settings.enabled) {
      const resetConsole = hookConsole(ctx.repository, settings)
      const resetError = hookError(ctx.repository, settings)
      return {
        ...ctx,
        settings,
        resetHook () {
          resetConsole()
          resetError()
        }
      }
    } else {
      if (ctx.resetHook != null) {
        ctx.resetHook()
      }
      return {
        ...ctx,
        resetHook: undefined
      }
    }
  }
}

const settingsPattern = pattern<WithContext<LogSettingsMsg>, Context>()
  .setup('event')
  .map({
    response (msg) {
      return {
        ...msg.ctx,
        ...toggleEnabledExtension(msg)
      }
    }
  })
  .orElse((msg) => msg.ctx)

const msgPattern = pattern<WithContext<Message>, Context>()
  .setup('kind')
  .map({
    settings (msg) {
      return settingsPattern.match(msg)
    }
  })
  .orElse((msg) => {
    return msg.ctx
  })

export default msgPattern
