import { ParentComponent } from 'solid-js'
import { flexStyle } from '../../styles.css'
import { classes } from '../../style_util'
import { blockStyle } from './styles.css'

interface Props {
  justify?: keyof typeof flexStyle.justify
  align?: keyof typeof flexStyle.align
}

const getClasses = (props: Props) => {
  const classList = [blockStyle]
  if (props.justify !== undefined) {
    classList.push(flexStyle.justify[props.justify])
  }
  if (props.align !== undefined) {
    classList.push(flexStyle.align[props.align])
  }
  return classes(classList)
}

const Block: ParentComponent<Props> = (props) => {
  return (<div class={getClasses(props)}>
    { props.children }
    </div>)
}

export default Block
