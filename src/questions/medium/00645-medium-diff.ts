/*
  Get an Object that is the difference between O & O1
*/
// Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O> 用于获取双方不同的key
// Extract<keyof O1, key> 用于确定key是否在O1中
type Diff<O, O1> = {
  [key in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: 
    key extends keyof O 
      ? O[key]
      : O1[Extract<keyof O1, key>]
}

import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]