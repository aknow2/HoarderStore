import injected from './injected/index.ts?script&module'
const injectJS = () => {
  const file = chrome.runtime.getURL(injected)
  const s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', file)
  s.setAttribute('name', 'HoarderStore-logger')
  s.async = false
  document.documentElement.appendChild(s)
}
const removeJs = () => {
  const script = document.querySelector('script[name="HoarderStore-logger"]')
  if (script != null) {
    document.documentElement.removeChild(script)
  }
}

export default {
  injectJS,
  removeJs
}
