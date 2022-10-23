
import { Component } from 'solid-js'
import Switch from '../../elements/Switch'
import { useProvider } from '../../provider'
import { appBarStyle, titleStyle } from './style.css'
import IconButton from '../../elements/IconButton'

const AppBar: Component = () => {
  const [state, actions] = useProvider()
  const toggleExtension = (checked: boolean) => {
    actions.updateSetting({
      enabled: checked
    })
      .then(() => {})
      .catch((e) => alert(e.message))
  }
  const toggleSetting = () => {
    actions.toggleSettings(!state.openSettings)
  }

  return (
    <header class={appBarStyle}>
        <div class={titleStyle}>
          Local Hoarder
          <Switch
            checked={state.logSettings.value?.enabled ?? false}
            onChange={toggleExtension}
          ></Switch>
        </div>
        <IconButton onClick={toggleSetting} type={state.openSettings ? 'close' : 'settings'}></IconButton>
    </header>
  )
}

export default AppBar
