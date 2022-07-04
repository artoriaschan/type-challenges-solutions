/*
  Implement a simpiled version of a Vue-like typing support.

  By providing a function name SimpleVue (similar to Vue.extend or defineComponent), it should properly infer the this type inside computed and methods.
*/

type MyReturn<D, C, M> = D & {
  [k in keyof C]: C[k] extends () => infer R ? R : never
}
// 获取计算属性的返回值类型
type ComputedValueof<C> = {
  [k in keyof C]: C[k] extends (...args: unknown[]) => infer R ? R : never
}

type OptionsType<D, C, M> = {
  data: () => D
  computed: C & ThisType<D & C>
  methods: M & ThisType<D & M & ComputedValueof<C>>
} & ThisType<C>

declare function SimpleVue<D, C, M>(
  options: OptionsType<D, C, M>
): MyReturn<D, C, M>

import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    }
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      console.log(this.amount)
      console.log(this.fullname.toLowerCase())
      console.log(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    }
  }
})
