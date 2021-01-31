import { objectType, inputObjectType } from '@nexus/schema'
import { Context } from 'src/context'
import { IAccountInput } from './Account'

export interface IClientInput {
  id?: string
  iin: string
  companyName: string
  address?: string
  phone?: string
  email?: string
  contactFullName?: string
  contactRole?: string
  note?: string
  accounts?: IAccountInput[]
}
export const ClientInput = inputObjectType({
  name: 'ClientInput',
  definition (t) {
    t.nullable.id('id')
    t.nonNull.string('iin')
    t.nonNull.string('companyName')
    t.nullable.string('address')
    t.nullable.string('phone')
    t.nullable.string('email')
    t.nullable.string('contactFullName')
    t.nullable.string('contactRole')
    t.nullable.string('note')
    t.nullable.list.field('accounts', {
      type: 'AccountInput',
      description: 'Client bank accounts'
    })
  }
})

export const Client = objectType({
  name: 'Client',
  definition (t) {
    t.model.id()
    t.model.iin()
    t.model.companyName()
    t.model.address()
    t.model.phone()
    t.model.email()
    t.model.contactFullName()
    t.model.contactRole()
    t.model.note()
    t.field('ltv', {
      type: 'Int',
      resolve: async (_parent, _, context: Context) => {
        const docs = await context.prisma.doc.findMany({
          where: {
            clientId: _parent.id
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
    t.model.accounts()
    t.model.docs()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.createdBy()
  }
})
