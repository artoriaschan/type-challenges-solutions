/*
  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
*/
// 通过 {} extends Pick<T, key> 来判断属性是否是 optional
// type GetRequired<T extends Record<string | number | symbol, any>> = {
//   [key in keyof T as {} extends Pick<T, key> ? never : key]: T[key];
// };

// T[key] extends Required<T>[key]
type GetRequired<T extends Record<string | number | symbol, any>> = {
  [key in keyof T as T[key] extends Required<T>[key] ? key : never]: T[key];
};

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]

type _a1 = {} extends Pick<{ foo: number; bar?: string }, 'bar'> ? true : false