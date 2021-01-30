import { objectType } from '@nexus/schema'

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.service()
    t.model.sku()
    t.model.unit()
    t.model.price()
    t.model.invoices({ type: 'Invoice' })
  }
})
