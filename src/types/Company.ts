import { objectType, inputObjectType } from '@nexus/schema'
import { IAccountInput } from './Account'

export interface ICompanyInput {
  name: string
  address: string
  phone: string
  website?: string
  currency?: string
  email?: string
  bin?: string
  accounts?: IAccountInput[]
}

export const CompanyInput = inputObjectType({
  name: 'CompanyInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('address')
    t.nonNull.string('phone')
    t.nullable.string('website')
    t.nullable.string('currency')
    t.nullable.string('email')
    t.nullable.string('bin')
  }
})
export const CompanyUpdateInput = inputObjectType({
  name: 'CompanyUpdateInput',
  definition (t) {
    t.nullable.string('name')
    t.nullable.string('address')
    t.nullable.string('phone')
    t.nullable.string('website')
    t.nullable.string('currency')
    t.nullable.string('email')
    t.nullable.string('bin')
    t.nullable.string('currency')
  }
})
export const Company = objectType({
  name: 'Company',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.address()
    t.model.phone()
    t.model.website()
    t.model.email()
    t.model.bin()
    t.model.accounts({ pagination: false, filtering: false })
    t.model.clients({ pagination: true, filtering: true })
    t.model.currency()
    t.model.docs({ pagination: false, filtering: false })
    t.model.products()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.owner()
  }
})
