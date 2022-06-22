/*
  Implement a generic PartialByKeys<T, K> which takes two type argument T and K.
  K specify the set of properties of T that should set to be optional. When K is not provided, it should make all properties optional just like the normal Partial<T>.

  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
*/

// type PartialByKeys<T, K extends keyof any = string> = Omit<{ [k in K & keyof T]+?: T[k] } & Omit<T, K>, never>;
type KV<T> = {
  [key in keyof T]: T[key]
}

type PartialByKeys<T, K = keyof T> = KV<
  {
    [key in keyof T as key extends K ? key : never]+?: T[key]
  } & {
    [key in keyof T as key extends K ? never : key]: T[key]
  }
>

import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>
]
