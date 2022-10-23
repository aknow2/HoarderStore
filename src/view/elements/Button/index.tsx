import { Component } from 'solid-js'
import { ButtonColors, buttonStyles } from './styles.css'

interface Props {
  onClick?: () => void
  label: string
  color?: ButtonColors
}
const Button: Component<Props> = (props) => {
  const className = buttonStyles[props.color ?? 'default']
  return (<div style={{ padding: '16px' }}>
    <button class={className} onClick={(ev) => {
      ev.preventDefault()
      if (props.onClick !== undefined)props.onClick()
    }}>
      { props.label }
  </button></div>)
}

export default Button
