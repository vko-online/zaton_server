import { inputObjectType, objectType } from '@nexus/schema'
import { IOrderInput } from './Order'

export interface IDocInput {
  offer: boolean
  template: boolean
  draft: boolean
  clientId: string
  sku?: number
  date?: Date
  dueDate?: Date
  orders?: IOrderInput[]
}
export const DocInput = inputObjectType({
  name: 'DocInput',
  definition (t) {
    t.nullable.int('sku')
    t.nonNull.boolean('offer')
    t.nonNull.boolean('template')
    t.nonNull.boolean('draft')
    t.nullable.field('date', { type: 'DateTime' })
    t.nullable.field('dueDate', { type: 'DateTime' })
    t.nonNull.id('clientId')
    t.nullable.list.field('orders', { type: 'OrderInput' })
  }
})

export const Doc = objectType({
  name: 'Doc',
  definition (t) {
    t.model.id()
    t.model.sku()
    t.model.offer()
    t.model.template()
    t.model.draft()
    t.model.date()
    t.model.dueDate()
    t.model.client()
    t.model.company()
    t.model.note()
    t.model.orders()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.createdBy()
  }
})
