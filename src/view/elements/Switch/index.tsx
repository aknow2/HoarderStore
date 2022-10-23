import { Component } from 'solid-js'
import { sliderStyle, switchStyle, inputStyle } from './styles.css'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}
const Switch: Component<Props> = (props) => {
  return <label class={switchStyle}>
      <input
        class={inputStyle}
        type="checkbox"
        checked={props.checked}
        onChange={ (ev) => {
          const { checked } = ev.currentTarget
          props.onChange(checked)
        } }
      />
      <span class={sliderStyle} />
    </label>
}

export default Switch
