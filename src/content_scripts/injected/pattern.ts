type BaseMap<A, K extends keyof A> = {
  [key in A[K] extends string ? A[K] : never]: Extract<A, { [x in K]: key }>
}

type PartialMapper<M, R> = {
  [key in keyof M]?: (v: M[key]) => R
}
type RequiredMapper<M, R> = {
  [key in keyof M]: (v: M[key]) => R
}

interface Match<A, R> {
  match: (value: A) => R
}

interface OrElse<A, R> {
  orElse: (func: (value: A) => R) => Match<A, R>
}

interface UnionMapper<A, K extends keyof A, R> {
  (mapper: RequiredMapper<BaseMap<A, K>, R>): Match<A, R> & OrElse<A, R>
  (mapper: PartialMapper<BaseMap<A, K>, R>): OrElse<A, R>
}

const pattern = <A, R>() => {
  return {
    setup: <K extends keyof A>(kindKey: K) => {
      const map: UnionMapper<A, K, R> = (mapper: RequiredMapper<BaseMap<A, K>, R> | PartialMapper<BaseMap<A, K>, R>) => {
        return {
          match: (value) => {
            const kind = value[kindKey] as keyof BaseMap<A, K>
            const match = mapper[kind]
            if (match == null) { throw new Error('invalid') }
            return match(value as Extract<A, { [x in K]: string }>)
          },
          orElse: (defaultFunc) => ({
            match: (value: A) => {
              const kind = value[kindKey] as keyof BaseMap<A, K>
              const match = mapper[kind] ?? defaultFunc
              return match(value as Extract<A, { [x in K]: string }>)
            }
          })
        }
      }
      return {
        map
      }
    }
  }
}

export default pattern
