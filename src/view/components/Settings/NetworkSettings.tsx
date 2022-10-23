import { Component } from 'solid-js'
import Block from '../../elements/Block'
import Switch from '../../elements/Switch'
import Typography from '../../elements/Typography'
import { useProvider } from '../../provider'

const NetworkSettings: Component = () => {
  const [state, actions] = useProvider()
  return (
    <Block align='center'>
      <Typography size='h5'>
        Network
      </Typography>
      <Switch
        checked={state.logSettings.value?.network.enabled ?? false}
        onChange={(checked) => {
          actions.updateSetting({
            network: {
              enabled: checked
            }
          })
            .then()
            .catch((e) => console.error(e))
        }}
      ></Switch>
    </Block>
  )
}

export default NetworkSettings
