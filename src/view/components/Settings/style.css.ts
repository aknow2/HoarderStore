import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const settingsStyle = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: vars.color.backgroundTint,
  padding: spacing,
  transition: '.5s',
  opacity: 0,
  transform: 'translateX(100px)',
  zIndex: -1,
  selectors: {
    '&.show': {
      opacity: 1,
      transform: 'translateX(0px)',
      zIndex: 999
    }
  }
})
