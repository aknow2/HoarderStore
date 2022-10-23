import { Component, createMemo, ParentComponent } from 'solid-js'
import { classes } from '../../style_util'
import Typography from '../Typography'
import { checkContainerStyle, checkStyle, chipStyle, chipGroup } from './styles.css'

interface Props {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

const FilterChip: Component<Props> = (props) => {
  let labelRef: HTMLLabelElement
  let checkSpan: HTMLSpanElement
  const styles = createMemo(() => {
    if (props.value) {
      return {
        label: classes([chipStyle, 'checked']),
        span: classes([checkStyle, 'checked'])
      }
    } else {
      return {
        label: classes([chipStyle]),
        span: classes([checkStyle])
      }
    }
  })

  return (<label ref={(r) => { labelRef = r } } class={styles().label} onClick={() => {
    labelRef.addEventListener('transitionend', () => {
      props.onChange(!props.value)
    }, { once: true })
    if (!props.value) {
      labelRef.classList.add('checked')
      checkSpan.classList.add('checked')
    } else {
      labelRef.classList.remove('checked')
      checkSpan.classList.remove('checked')
    }
  }}>
        <div class={checkContainerStyle}>
          <span ref={(r) => { checkSpan = r }} class={styles().span} ></span>
        </div>
        <Typography>{ props.label }</Typography>
      </label>
  )
}

export const ChipGroup: ParentComponent = (props) => {
  return <div class={chipGroup}> { props.children } </div>
}
export default FilterChip
