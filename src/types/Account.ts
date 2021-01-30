import { objectType, inputObjectType } from '@nexus/schema'

export interface IAccountInput {
  bin: string
  balance?: number
  name?: string
  bankName: string
}
export const AccountInput = inputObjectType({
  name: 'AccountInput',
  definition (t) {
    t.string('bin')
    t.int('balance', { required: false })
    t.string('name', { required: false })
    t.string('bankName')
  }
})

export const Account = objectType({
  name: 'Account',
  definition (t) {
    t.model.id()
    t.model.bin()
    t.model.balance()
    t.model.name()
    t.model.bankName()
    t.model.company({ type: 'Company' })
  }
})
