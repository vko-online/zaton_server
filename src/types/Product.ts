import { inputObjectType, objectType } from '@nexus/schema'
import { Context } from 'src/context'

export interface IProductInput {
  name: string
  price: number
  unit?: string
  ltv?: number
  description?: string
}
export const ProductInput = inputObjectType({
  name: 'ProductInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.int('price')
    t.nullable.string('unit')
    t.nullable.string('description')
  }
})

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.price()
    t.model.description()
    t.model.unit()
    t.field('ltv', {
      type: 'Int',
      resolve: async (product, _, context: Context) => {
        const docs = await context.prisma.doc.findMany({
          where: {
            productId: product.id
          },
          include: {
            orders: {
              include: {
                product: {
                  select: {
                    price: true
                  }
                }
              }
            }
          }
        })
        const orders = docs.map(v => v.orders).flat()
        return orders.reduce((a, v) => a + v.product.price * v.qty, 0)
      }
    })
    t.model.docs({ pagination: false, filtering: false })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.createdBy()
  }
})
