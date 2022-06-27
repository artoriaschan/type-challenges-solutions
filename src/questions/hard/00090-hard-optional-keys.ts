/*
  OptionalKeys<T>
*/
// {} extends Pick<T, key>
// type OptionalKeys<T extends Record<string | number | symbol, any>> = keyof {
//   [key in keyof T as {} extends Pick<T, key> ? key : never]: T[key];
// };

// T[key] extends Required<T>[key]
type OptionalKeys<T extends Record<string | number | symbol, any>> = keyof {
  [key in keyof T as T[key] extends Required<T>[key] ? never : key]: T[key];
};

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]