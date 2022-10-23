import { createContext, useContext, ParentComponent, createSignal } from 'solid-js'

const buildStore = () => {
  const [id, setId] = createSignal(0)
  const store = [
    {
      getId: () => {
        setId(id() + 1)
        return `HoarderStore-id-${id()}`
      }
    }
  ] as const

  return store
}

type IdStore = ReturnType<typeof buildStore>
const IdContext = createContext<IdStore>()

export const IdProvider: ParentComponent = (props) => {
  const store = buildStore()
  return (
    <IdContext.Provider value={store}>
      {props.children}
    </IdContext.Provider>
  )
}

export function useIdProvider () {
  const provider = useContext(IdContext)
  if (provider === undefined) throw new Error('Not found provider')

  return provider
}
