import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const textContainerStyle = style({
  position: 'relative',
  width: '100%',
  height: 80
})

export const textLabelStyle = style({
  position: 'absolute',
  top: -25,
  left: 0,
  fontSize: vars.size.body,
  color: vars.color.text,
  selectors: {
    '&.error': {
      color: vars.color.error
    }
  }
})

export const textInputStyle = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  marginTop: spacing * 2,
  padding: spacing,
  color: vars.color.textReverse,
  fontSize: vars.size.body,
  backgroundColor: vars.color.backgroundReverse,
  outline: 'none',
  border: 'none',
  borderRadius: 5,
  selectors: {
    '&.error': {
      border: `0.1rem solid ${vars.color.error}`
    }
  }
})
