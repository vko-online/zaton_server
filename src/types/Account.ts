import { objectType, inputObjectType } from '@nexus/schema'

export interface IAccountInput {
  iban: string
  bic: string
  name: string
}
export const AccountInput = inputObjectType({
  name: 'AccountInput',
  definition (t) {
    t.nonNull.string('iban')
    t.nonNull.string('bic')
    t.nonNull.string('name')
  }
})

export const Account = objectType({
  name: 'Account',
  definition (t) {
    t.model.id()
    t.model.iban()
    t.model.bic()
    t.model.name()
  }
})
