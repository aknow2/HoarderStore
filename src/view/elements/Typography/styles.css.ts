import { style, globalStyle } from '@vanilla-extract/css'
import { spacing, vars } from '../../styles.css'

export const switchStyle = style({
  position: 'relative',
  display: 'inline-block',
  width: 30,
  height: 30,
  backgroundColor: '#ccc',
  marginLeft: spacing * 2,
  marginRight: spacing * 2,
  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      backgroundColor: '#ccc',
      left: -15,
      width: 30,
      height: 30,
      borderRadius: '50%',
      zIndex: 1
    },
    '&:after': {
      content: '',
      position: 'absolute',
      backgroundColor: '#ccc',
      right: -15,
      width: 30,
      height: 30,
      borderRadius: '50%',
      zIndex: 1
    }
  }
})

const transitionTime = '.4s'

export const inputStyle = style({
  opacity: 0,
  width: 0,
  height: 0
})

export const sliderStyle = style({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  WebkitTransition: transitionTime,
  transition: transitionTime,
  selectors: {
    '&:after': {
      position: 'absolute',
      content: 'OFF',
      color: 'white',
      fontSize: 14,
      backgroundColor: vars.color.error,
      left: -15,
      width: 30,
      height: 30,
      transition: transitionTime,
      WebkitTransition: transitionTime,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      zIndex: 2
    }
  }
})

const translateX = 'translateX(30px)'
globalStyle(`${inputStyle}:checked + ${sliderStyle}:after`, {
  content: 'ON',
  backgroundColor: vars.color.success,
  transform: translateX,
  msTransform: translateX,
  WebkitTransform: translateX
})
