import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

const chipBorder = `solid 1px ${vars.color.primary}`

const transitionTime = 'all .3s ease-in'

export const chipStyle = style({
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: chipBorder,
  borderRadius: 10,
  height: 24,
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: spacing / 3,
  padding: spacing / 3,
  paddingRight: spacing,
  transition: transitionTime,
  color: vars.color.primary,
  selectors: {
    '&.checked': {
      backgroundColor: vars.color.primary,
      filter: 'brightness(1.3)'
    }
  }
})

export const checkContainerStyle = style({
  position: 'relative',
  backgroundColor: 'transparent',
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
export const checkStyle = style({
  backgroundColor: 'transparent',
  border: `solid 1px ${vars.color.primary}`,
  width: 12,
  height: 12,
  transition: transitionTime,
  selectors: {
    '&.checked': {
      border: `solid 2px ${vars.color.text}`,
      borderLeft: 0,
      borderTop: 0,
      width: 6,
      transform: 'rotate(45deg) translateY(-1px)'
    }
  }
})
export const chipGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing,
  flexWrap: 'wrap'
})
