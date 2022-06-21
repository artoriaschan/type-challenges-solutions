/*
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
*/
// 联合类型 (keyof T | K)
// 判断map的key是否是append的key key extends K
// 过滤Append的key Exclude<key, K> => 直接写T[key]不可以，因为key是遍历的联合类型(keyof T | K)
type AppendToObject<
  T extends object,
  K extends number | string | symbol,
  V extends unknown
> = {
  [key in keyof T | K]: key extends K ? V : T[Exclude<key, K>]
}

import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<
    Equal<
      AppendToObject<test3, 'isMotherRussia', false | undefined>,
      testExpect3
    >
  >
]
