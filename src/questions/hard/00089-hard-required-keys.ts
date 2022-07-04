/*
  type Result = RequiredKeys<{ foo: number; bar?: string }>;
  // expected to be “foo”
*/

// {} extends Pick<T, key>
// type RequiredKeys<T extends Record<string | number | symbol, any>> = keyof {
//   [key in keyof T as {} extends Pick<T, key> ? never : key]: T[key];
// };

// T[key] extends Required<T>[key]
type RequiredKeys<T extends Record<string | number | symbol, any>> = keyof {
  [key in keyof T as T[key] extends Required<T>[key] ? key : never]: T[key]
}

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      'a' | 'c' | 'd'
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
]
