/*
  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
*/

// 同时遍历key 使用 | 联合
type Merge<T, U> = {
  [key in keyof T | keyof U]: key extends keyof U
    ? U[key]
    : key extends keyof T
    ? T[key]
    : never
}

import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >
]
