import { Component, createEffect, createSignal } from 'solid-js'
import { classes } from '../../style_util'
import Typography from '../Typography'
import { textContainerStyle, textInputStyle, textLabelStyle } from './styles.css'

interface Props {
  value: string
  label: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  errorMsg?: string
}

const TextField: Component<Props> = (props) => {
  const [hasError, setError] = createSignal(false)

  createEffect(() => {
    setError(props.errorMsg !== undefined)
  })

  return <div class={textContainerStyle}>
      <input
      class={hasError() ? classes([textInputStyle, 'error']) : textInputStyle}
      type="text"
      value={props.value}
      onInput={(ev) => {
        const value = ev.currentTarget.value
        if (props.onInput !== undefined) props.onInput(value)
      }}
      onChange={(ev) => {
        const value = ev.currentTarget.value
        if (props.onChange !== undefined) props.onChange(value)
      }}/>
      {
        hasError() &&
          <div>
            <Typography color='error'>{ props.errorMsg }</Typography>
          </div>
      }
      <label class={hasError() ? classes([textLabelStyle, 'error']) : textLabelStyle}>{props.label}</label>
    </div>
}

export default TextField
