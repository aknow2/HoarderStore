/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'
import { ContextProvider as Provider } from './provider'
import { IdProvider } from './provider/idProvider'
import './index.css.ts'

render(() => <IdProvider><Provider><App /></Provider></IdProvider>, document.getElementById('root') as HTMLElement)
