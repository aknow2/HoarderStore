import { Component } from 'solid-js'
import Block from '../../elements/Block'
import Group from '../../elements/Group'
import Typography from '../../elements/Typography'
import { classes } from '../../style_util'
import ConsoleSettings from './ConsoleSettings'
import LoggingSettings from './LoggingSettings'
import NetworkSettings from './NetworkSettings'
import { settingsStyle } from './style.css'
import WindowEventSettings from './WindowEventSettings'

interface Props {
  show: boolean
}
const Settings: Component<Props> = (props) => {
  return (
    <div class={props.show ? classes([settingsStyle, 'show']) : settingsStyle}>
        <Block>
          <Typography size='h3'>
            Settings
          </Typography>
        </Block>
        <Block>
          <LoggingSettings></LoggingSettings>
        </Block>
        <Block>
          <Group>
            <Typography size='h4'>
              Javascript
            </Typography>
            <hr />
            <ConsoleSettings></ConsoleSettings>
            <WindowEventSettings></WindowEventSettings>
          </Group>
        </Block>
        <Block>
          <Group>
            <NetworkSettings></NetworkSettings>
          </Group>
        </Block>
    </div>
  )
}

export default Settings
