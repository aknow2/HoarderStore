import { ParentComponent } from 'solid-js'
import { groupStyle } from './styles.css'

const Group: ParentComponent = (props) => {
  return <div class={groupStyle}>
    {props.children}
  </div>
}

export default Group
