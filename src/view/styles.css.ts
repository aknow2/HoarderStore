import { createTheme, style } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    background: '#0D0D0D',
    backgroundTint: '#262626',
    backgroundReverse: '#EFEFEF',
    primary: '#2484BF',
    secondary: '#465902',
    text: '#EFEFEF',
    textReverse: '#333',
    success: '#49BF9E',
    error: '#F27289',
    warn: '#F2E307'
  },
  size: {
    h1: '2.5rem',
    h2: '2.2rem',
    h3: '2rem',
    h4: '1.8rem',
    h5: '1.5rem',
    h6: '1.2rem',
    body: '1rem',
    body2: '0.9rem',
    caption: '0.7rem',
    button: '0.8rem'
  }
})
export const spacing = 16

const flex = {
  display: 'flex'
}
export const flexStyle = {
  justify: {
    center: style({ ...flex, justifyContent: 'center' }),
    between: style({ ...flex, justifyContent: 'space-between' })
  },
  align: {
    center: style({ ...flex, alignItems: 'center' }),
    start: style({ ...flex, alignItems: 'flex-start' })
  }
}
