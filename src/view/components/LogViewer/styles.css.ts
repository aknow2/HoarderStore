import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const logViewerContainerStyle = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: vars.color.background
})

export const toolbarStyle = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: spacing,
  alignItems: 'center',
  padding: spacing
})

export const listContainer = style({
  padding: spacing,
  width: '100%',
  height: '100%'
})
export const listItemStyle = style({
  border: `1px solid ${vars.color.text}`,
  padding: spacing / 2,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  backgroundColor: vars.color.backgroundTint
})
