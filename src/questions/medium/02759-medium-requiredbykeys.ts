/*
  Implement a generic RequiredByKeys<T, K> which takes two type argument T and K.

  K specify the set of properties of T that should set to be required. When K is not provided, it should make all properties required just like the normal Required<T>.

  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
*/

type KV<T> = {
  [key in keyof T]: T[key]
}

type RequiredByKeys<T, K = keyof T> = KV<
  {
    [key in keyof T as key extends K ? key : never]-?: T[key]
  } & {
    [key in keyof T as key extends K ? never : key]: T[key]
  }
>

import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>
]
