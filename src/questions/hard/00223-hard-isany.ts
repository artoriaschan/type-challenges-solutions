/*
  let's write a utility type IsAny<T>, which takes input type T. If T is any, return true, otherwise, return false.
*/

// only any & ... => any
type IsAny<T> = 1 extends T & 0 ? true : false

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]