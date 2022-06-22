/*
  Implement the type version of Object.entries

  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
*/
// 使用其他参数保存临时key union
type ObjectEntries<T, K extends keyof T = keyof T> = K extends keyof T
  ? [
      K,
      T[K] extends undefined ? undefined : Exclude<T[K], undefined> // 移除Partial的undefined
    ]
  : never

import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>
]
