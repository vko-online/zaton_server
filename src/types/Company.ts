import { objectType, inputObjectType } from '@nexus/schema'
import { IAccountInput } from './Account'

export interface ICompanyInput {
  name: string
  accounts: IAccountInput[]
}
export const CompanyInput = inputObjectType({
  name: 'CompanyInput',
  definition (t) {
    t.string('name')
    t.list.field('accounts', { type: 'AccountInput' })
  }
})
export const Company = objectType({
  name: 'Company',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.stamp()
    t.model.user()
    t.model.clients({ type: 'Client' })
    t.model.invoices({ type: 'Invoice' })
    t.model.products({ type: 'Product' })
    t.model.accounts({ type: 'Account' })
  }
})
