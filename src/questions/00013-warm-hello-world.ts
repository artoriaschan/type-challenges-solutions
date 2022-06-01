/**
```ts
// 期望是一个 string 类型
type HelloWorld = any
```

```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```
 */
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type HelloWorld = string

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]
