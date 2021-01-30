import { inputObjectType, objectType } from '@nexus/schema'
import { ILineInput } from './Line'

export interface IInvoiceInput {
  num: string
  date: Date
  clientId: string
  accountId: string
  companyId: string
  productLine: ILineInput[]
}
export const InvoiceInput = inputObjectType({
  name: 'InvoiceInput',
  definition (t) {
    t.string('num')
    t.field('date', { type: 'DateTime' })
    t.id('clientId')
    t.id('accountId')
    t.id('companyId')
    t.list.field('productLine', { type: 'LineInput' })
  }
})

export const Invoice = objectType({
  name: 'Invoice',
  definition (t) {
    t.model.id()
    t.model.num()
    t.model.date()
    t.model.draft()
    t.model.client({ type: 'Client' })
    t.model.productLine({ type: 'Line' })
    t.model.account({ type: 'Account' })
    t.model.company({ type: 'Company' })
  }
})
