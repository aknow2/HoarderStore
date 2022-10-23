import { Component, createMemo, For } from 'solid-js'
import { WindowEvents } from '../../../types'
import Block from '../../elements/Block'
import FilterChip, { ChipGroup } from '../../elements/FilterChip'
import Typography from '../../elements/Typography'
import { useProvider } from '../../provider'

const windowEvents: WindowEvents[] = ['error']

const WindowEventSettings: Component = () => {
  const [state, actions] = useProvider()
  const consoleSettings = createMemo(() => {
    return windowEvents.map((item) => ({
      key: item,
      checked: state.logSettings.value?.window.targets.includes(item) ?? false
    }))
  })
  return (
    <Block>
      <Typography size='h5'>
        Window events
      </Typography>
      <Block>
        <ChipGroup>
          <For each={consoleSettings()} fallback={<div>Loading...</div>}>
            {(item) => {
              const settings = state.logSettings.value
              if (settings === undefined) {
                return <></>
              }
              const { targets } = settings.window

              const getUpdatedTarget = (value: boolean) => {
                if (value) {
                  if (targets.includes(item.key)) {
                    return targets
                  }
                  return targets.concat([item.key])
                } else {
                  return targets.filter((t) => t !== item.key)
                }
              }
              const onChange = () => {
                const updatedTargets = getUpdatedTarget(!item.checked)
                actions.updateSetting({
                  window: {
                    ...settings.console,
                    targets: updatedTargets
                  }
                })
                  .then()
                  .catch((e) => alert(e))
              }
              return <FilterChip value={item.checked} onChange={onChange} label={item.key} ></FilterChip>
            }}
          </For>
        </ChipGroup>
      </Block>
    </Block>
  )
}

export default WindowEventSettings
