import { Component, For, Show } from 'solid-js'
import Button from '../../elements/Button'
import IconButton from '../../elements/IconButton'
import Typography from '../../elements/Typography'
import { useProvider } from '../../provider'
import { listContainer, listItemStyle, logViewerContainerStyle, toolbarStyle } from './styles.css'
const pad2 = (num: number) => num.toString().padStart(2, '0')
const dateFormatter = (date: Date) =>
  `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}: ${date.getSeconds()}.${date.getMilliseconds()}`
const LogViewer: Component = () => {
  const provider = useProvider()
  const [state, actions] = provider
  const clearAllLogs = () => {
    actions.clearAllLogs()
      .then(async () => await actions.fetchLogs())
      .then()
      .catch((e) => alert(e.message))
  }
  const downloadLogs = () => {
    actions.fetchLogs()
      .then(() => {
        const logs = state.logs.value
        const txt = JSON.stringify(logs)
        const blob = new Blob([txt], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)

        const anchorElement = document.createElement('a')
        anchorElement.setAttribute('href', url)
        anchorElement.setAttribute('download', `${Date.now()}_logs.txt`)

        const mouseEvent = new MouseEvent('click')
        anchorElement.dispatchEvent(mouseEvent)
      })
      .catch((e) => alert(e.message))
  }
  return <div class={logViewerContainerStyle}>
    <div class={toolbarStyle}>
      <IconButton type='refresh' onClick={() => {
        actions.fetchLogs().then().catch((e) => alert(e.message))
      }} ></IconButton>
      <Button color='primary' onClick={downloadLogs} label="Download logs" />
      <Button color='error' onClick={clearAllLogs} label="clear all logs" />
    </div>
    <div class={listContainer}>
      <Show
        when={state.logs.value.length > 0}
        fallback={<div><Typography size='body2'>No logs</Typography></div>}
      >
        <For each={state.logs.value}>
          {(log) => {
            return <div class={listItemStyle}>
              <div>
                <Typography size='caption'>
                  Date: {dateFormatter(new Date(log.timestamp))}
                </Typography>
              </div>
              <div>
                <Typography size='caption'>
                  From: {log.source}.{log.event}
                </Typography>
              </div>
              <div>
                <Typography size='body'>
                  {log.messages.map((m) => {
                    if (typeof m === 'object') {
                      return JSON.stringify(m)
                    }
                    return m
                  }).join(', ')}
                </Typography>
              </div>
              <div>
                <Typography size='caption'>
                  URL: {log.href}
                </Typography>
              </div>
            </div>
          }}
        </For>
      </Show>
    </div>
  </div>
}

export default LogViewer
