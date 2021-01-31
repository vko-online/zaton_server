import { inputObjectType, objectType } from '@nexus/schema'

export interface IOrderInput {
  qty: number
  productId: string
}

export const OrderInput = inputObjectType({
  name: 'OrderInput',
  definition (t) {
    t.nonNull.int('qty')
    t.nonNull.id('productId')
  }
})

export const Order = objectType({
  name: 'Order',
  definition (t) {
    t.model.id()
    t.model.qty()
    t.model.product()
  }
})
