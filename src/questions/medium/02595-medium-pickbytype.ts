/*
  From T, pick a set of properties whose type are assignable to U.

  type OnlyBoolean = PickByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> 
  // { isReadonly: boolean; isEnable: boolean; }
*/

// 使用as对type value进行判断
// mapped types 会自动过滤key为never的属性
type PickByType<T, U> = {
  [K in keyof T as U extends T[K] ? K : never]: T[K]
}

import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
]
