import { Component, createMemo, For } from 'solid-js'
import { ConsoleProps } from '../../../types'
import Block from '../../elements/Block'
import FilterChip, { ChipGroup } from '../../elements/FilterChip'
import Typography from '../../elements/Typography'
import { useProvider } from '../../provider'

const consoleProps: ConsoleProps[] = ['log', 'info', 'warn', 'error', 'assert']

const ConsoleSettings: Component = () => {
  const [state, actions] = useProvider()
  const consoleSettings = createMemo(() => {
    return consoleProps.map((item) => ({
      key: item,
      checked: state.logSettings.value?.console.targets.includes(item) ?? false
    }))
  })

  return (
    <Block>
      <Typography size='h5'>
        Console
      </Typography>
      <Block>
        <ChipGroup>
          <For each={consoleSettings()} fallback={<div>Loading...</div>}>
            {(item) => {
              const settings = state.logSettings.value
              if (settings === undefined) {
                return <></>
              }
              const { targets } = settings.console

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
                  console: {
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

export default ConsoleSettings
