/*
  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as btn, element that depends upon the block would be represented as `btn__price`, 
  modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement BEM<B, E, M> which generate string union from these three parameters. Where B is a string literal, E and M are string arrays (can be empty).
*/

// Conditional Types 使用 number 遍历数组类型
type BEM<
  B extends string,
  E extends string[] = [],
  M extends string[] = []
> = E extends []
  ? M extends []
    ? B
    : `${B}--${M[number]}`
  : M extends []
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
]
