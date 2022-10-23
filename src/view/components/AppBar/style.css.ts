import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const appBarStyle = style({
  padding: spacing,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: vars.color.background
})

export const titleStyle = style({
  fontSize: vars.size.h1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
