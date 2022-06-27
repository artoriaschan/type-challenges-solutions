/*
  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
*/
// 与 GetRequired 类似，依然是如何判断属性是 optional
// type GetOptional<T extends Record<string | number | symbol, any>> = {
//   [key in keyof T as {} extends Pick<T, key> ? key : never]: T[key];
// };

// T[key] extends Required<T>[key]
type GetOptional<T extends Record<string | number | symbol, any>> = {
  [key in keyof T as T[key] extends Required<T>[key] ? never : key]: T[key];
};

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]