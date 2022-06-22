/*
  Implement EndsWith<T, U> which takes two exact string types and returns whether T ends with U
  For example:

  type a = EndsWith<'abc', 'bc'> // expected to be false
  type b = EndsWith<'abc', 'abc'> // expected to be true
  type c = EndsWith<'abc', 'd'> // expected to be false
*/

type EndsWith<
  S extends string,
  End extends string
> = S extends `${infer _}${End}` ? true : false

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>
]
