/*
  type A = IsNever<never>  // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
*/
// 这里有个有趣的地方
// type a = never extends never ? true : false; // a is true

// type isNever<T> = T extends never ? true : false
// type b = isNever<never> // b is never

// Distributive Conditional Types: 当条件类型作用于泛型类型时，当给定一个联合类型时，会将联合类型分开单独计算和进行合并返回
// 因为never是一个特殊的联合类型，它没有任何一个成员，自然也不需要计算了，直接返回never就是了
// 不想让Distributive Conditional Types生效的话，可以在泛型前后加上括号即可
type IsNever<T> = [T] extends [never] ? true : false

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
]
