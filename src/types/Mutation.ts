import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, arg, booleanArg } from '@nexus/schema'
import { APP_SECRET, getUserId } from '../utils'
import { CompanyInput, ICompanyInput } from './Company'
import { IInvoiceInput } from './Invoice'

export const Mutation = mutationType({
  definition (t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        phone: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: async (_parent, { name, phone, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            phone,
            password: hashedPassword
          }
        })

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        }
      }
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        phone: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: async (_parent, { phone, password }, context) => {
        const users = await context.prisma.user.findMany({
          where: {
            phone
          }
        })
        if (!users.length)
          throw new Error(`No user found for phone: ${phone}`)

        const user = users[0]
        const passwordValid = await compare(password, user.password)
        if (!passwordValid)
          throw new Error('Invalid password')

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        }
      }
    })

  
//#region client api
    t.field('createClient', {
      type: 'Client',
      args: {
        data: arg({ type: 'ClientInput' }),
        companyId: idArg()
      },
      resolve: async (_parent, { companyId, data }, context) => {
        // todo: check for company ownership
        const client = await context.prisma.client.create({
          data
        })
        await context.prisma.company.update({
          where: {
            id: companyId
          },
          data: {
            clients: {
              connect: {
                id: client.id
              }
            }
          }
        })
        
        return client
      }
    })

    t.field('updateClient', {
      type: 'Client',
      args: {
        data: arg({ type: 'ClientInput' }),
        clientId: idArg()
      },
      resolve: async (_parent, { clientId, data }, context) => {
        return await context.prisma.client.update({
          where: {
            id: clientId
          },
          data
        })
      }
    })


    t.field('deleteClient', {
      type: 'Client',
      args: {
        clientId: idArg(),
        companyId: idArg()
      },
      resolve: async (_parent, { companyId, clientId }, context) => {
        return context.prisma.company.update({
          where: {
            id: companyId
          },
          data: {
            clients: {
              delete: {
                id: clientId
              }
            }
          }
        })
      }
    })
//#endregion

//#region invoice api
  t.field('createInvoice', {
    type: 'Invoice',
    args: {
      data: arg({ type: 'InvoiceInput' })
    },
    resolve: async (_parent, { data }: { data: IInvoiceInput }, context) => {
      const invoice = await context.prisma.invoice.create({
        data: {
          company: {
            connect: {
              id: data.companyId
            }
          },
          client: {
            connect: {
              id: data.clientId
            }
          },
          account: {
            connect: {
              id: data.accountId
            }
          },
          draft: true,
          date: data.date,
          productLine: {
            create: data.productLine.map(v => ({
              product: {
                connect: {
                  id: v.product
                }
              },
              qty: v.qty
            }))
          }
        }
      })

      return invoice
    }
  })
//#endregion

//#region company api
    t.field('createCompany', {
      type: 'Company',
      args: {
        data: arg({ type: 'CompanyInput' })
      },
      resolve: async (_parent, { data }: { data: ICompanyInput }, context) => {
        const userId = getUserId(context)
        const company = await context.prisma.company.create({
          data: {
            name: data.name,
            user: {
              connect: {
                id: userId
              }
            },
            stamp: 'not implemented',
            accounts: {
              create: data.accounts
            }
          }
        })

        return company
      }
    })
  }
//#endregion
})
