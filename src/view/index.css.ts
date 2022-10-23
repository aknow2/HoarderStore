import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from './styles.css'

globalStyle('*', {
  margin: 0,
  boxSizing: 'border-box',
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  color: vars.color.text
})
const fullPage = {
  width: '100%',
  height: '100%'
}
globalStyle('html', {
  ...fullPage
})
globalStyle('body', {
  ...fullPage
})
globalStyle('#root', {
  ...fullPage
})

export const appStyle = style({
  ...fullPage,
  backgroundColor: vars.color.background
})
export const contentStyle = style({
  ...fullPage,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: vars.color.background
})
