import { ParentComponent } from 'solid-js'
import { vars } from '../../styles.css'

type SizeType = keyof typeof vars.size
type ColorType = keyof typeof vars.color
interface Props {
  size?: SizeType
  color?: ColorType
}
const Typography: ParentComponent<Props> = (props) => {
  const fontSize = props.size === undefined ? vars.size.body : vars.size[props.size]
  const color = props.color === undefined ? vars.color.text : vars.color[props.color]
  return <span style={{ 'font-size': fontSize, color }}>
        {props.children}
      </span>
}

export default Typography
