import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const groupStyle = style({
  padding: spacing / 2,
  border: `0.1rem solid ${vars.color.text}`,
  borderRadius: '10px'
})
