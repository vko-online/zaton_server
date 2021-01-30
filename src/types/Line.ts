import { inputObjectType, objectType } from '@nexus/schema'

export interface ILineInput {
  qty: number
  product: string
}

export const LineInput = inputObjectType({
  name: 'LineInput',
  definition (t) {
    t.int('qty')
    t.id('product')
  }
})

export const Line = objectType({
  name: 'Line',
  definition (t) {
    t.model.id()
    t.model.qty()
    t.model.product({ type: 'Product' })
  }
})
