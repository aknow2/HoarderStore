import { style } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

const buttonSelector = {
  '&:hover': {
    filter: 'brightness(1.1)'
  },
  '&:active': {
    filter: 'brightness(1.3)'
  }
}
const height = 32

const createButtonVariant = (color: string) => {
  return style({
    position: 'relative',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: vars.color.text,
    padding: `${spacing / 2}px ${spacing / 4}px`,
    filter: 'brightness(1)',
    backgroundColor: color,
    zIndex: 1,
    selectors: {
      ...buttonSelector,
      '&:before': {
        position: 'absolute',
        height,
        width: height,
        content: '',
        backgroundColor: color,
        borderRadius: '50%',
        left: -height / 2,
        zIndex: -1
      },
      '&:after': {
        position: 'absolute',
        content: '',
        height,
        width: height,
        backgroundColor: color,
        borderRadius: '50%',
        right: -height / 2,
        zIndex: -1
      }
    }
  })
}

export const buttonStyles = {
  default: createButtonVariant(vars.color.backgroundTint),
  primary: createButtonVariant(vars.color.primary),
  error: createButtonVariant(vars.color.error),
  success: createButtonVariant(vars.color.success)
}

export type ButtonColors = keyof typeof buttonStyles
