import { style } from '@vanilla-extract/css'
import { vars } from '../../styles.css'

export const buttonStyle = style({
  backgroundColor: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  border: 'none',
  width: 42,
  height: 42,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  selectors: {
    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    }
  }
})

export const imgStyle = style({
  fill: vars.color.text
})
