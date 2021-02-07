import { inputObjectType, objectType } from '@nexus/schema'

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
    t.nullable.int('ltv')
    t.nullable.string('description')
  }
})

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.price()
    t.model.unit()
    t.model.ltv()
    t.model.docs({ pagination: false, filtering: false })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.createdBy()
  }
})
