import { Component, onMount } from 'solid-js'
import { useProvider } from './provider'
import AppBar from './components/AppBar'
import Settings from './components/Settings'
import { themeClass } from './styles.css'
import { appStyle, contentStyle } from './index.css'
import { classes } from './style_util'
import LogViewer from './components/LogViewer'

const App: Component = () => {
  const provider = useProvider()
  const [state, actions] = provider

  onMount(() => {
    actions
      .fetchSettings()
      .then(async () => await actions.fetchLogs())
      .then()
      .catch((e) => alert(e.message))
  })

  return (
    <div class={classes([themeClass, appStyle])}>
      <AppBar />
      <div class={contentStyle}>
        <LogViewer></LogViewer>
        <Settings show={state.openSettings}></Settings>
      </div>
    </div>
  )
}

export default App
