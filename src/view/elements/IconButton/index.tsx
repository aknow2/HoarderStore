import { Component, createEffect, createSignal, JSX } from 'solid-js'
import pattern from '../../../pattern'
import SettingIcon from './settings.svg'
import CloseIcon from './close.svg'
import RefreshIcon from './refresh.svg'
import { buttonStyle, imgStyle } from './styles.css'

interface Props {
  onClick?: () => void
  type: 'settings' | 'close' | 'refresh'
}
export type IconType = Props['type']
const IconButton: Component<Props> = (props) => {
  const [getIcon, setIcon] = createSignal(<SettingIcon></SettingIcon>)

  createEffect(() => {
    const nextIcon = pattern<Props, JSX.Element>()
      .setup('type').map({
        settings: () => {
          return <SettingIcon></SettingIcon>
        },
        close: () => {
          return <CloseIcon></CloseIcon>
        },
        refresh: () => {
          return <RefreshIcon></RefreshIcon>
        }
      })
      .match(props)
    setIcon(() => nextIcon)
  })

  return (<button class={buttonStyle} onClick={props?.onClick}>
    <div class={imgStyle}>
      { getIcon() }
    </div>
  </button>)
}

export default IconButton
