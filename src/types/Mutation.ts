import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, arg, booleanArg } from '@nexus/schema'
import { APP_SECRET, getUserId } from '../utils'
import { CompanyInput, ICompanyInput } from './Company'
import { IDocInput } from './Doc'
import { Context } from 'src/context'

export const Mutation = mutationType({
  definition (t) {
    // #region auth
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        data: arg({ type: 'SignupInput' })
      },
      resolve: async (_parent, { data }, ctx) => {
        const { name, email, password } = data
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
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
        data: arg({ type: 'SigninInput' })
      },
      resolve: async (_parent, { data }, context) => {
        const { email, password } = data
        const users = await context.prisma.user.findMany({
          where: {
            email
          }
        })
        if (!users.length)
          throw new Error(`No user found for email: ${email}`)

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
    // #endregion

    // #region product

    t.field('createProduct', {
      type: 'Product',
      args: {
        data: arg({ type: 'ProductInput'})
      },
      resolve: async (_parent, { data }, context: Context) => {
        const userId = getUserId(context)
        const company = await context.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
        const product = await context.prisma.product.create({
          data: {
            createdById: userId,
            companyId: company.id,
            name: data.name,
            price: data.price,
            description: data.description,
            unit: data.unit
          }
        })
        
        return product
      }
    })

    // #endregion

    // #region company

    t.field('createCompany', {
      type: 'Company',
      args: {
        data: arg({ type: 'CompanyInput'})
      },
      resolve: async (_parent, { data }, context: Context) => {
        const userId = getUserId(context)
        const existingCompany = await context.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
        if (existingCompany) {
          throw new Error('User can have 1 company')
        }
        const company = await context.prisma.company.create({
          data: {
            ...data,
            ownerId: userId
          }
        })
        
        return company
      }
    })

    t.field('updateCompany', {
      type: 'Company',
      args: {
        data: arg({ type: 'CompanyUpdateInput'})
      },
      resolve: async (_parent, { data }, context: Context) => {
        const userId = getUserId(context)
        const existingCompany = await context.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
        if (!existingCompany) {
          throw new Error('User has no company')
        }
        const company = await context.prisma.company.update({
          where: {
            id: existingCompany.id
          },
          data: {
            address: data.address,
            bin: data.bin,
            email: data.email,
            name: data.name,
            phone: data.phone,
            website: data.website
          }
        })
        
        return company
      }
    })

    // #endregion

    // #region client

    t.field('createClient', {
      type: 'Client',
      args: {
        data: arg({ type: 'ClientInput' })
      },
      resolve: async (_parent, { data }, context: Context) => {
        const userId = getUserId(context)
        const company = await context.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
        const client = await context.prisma.client.create({
          data: {
            companyName: data.companyName,
            iin: data.iin,
            contactFullName: data.contactFullName,
            contactRole: data.contactRole,
            email: data.email,
            note: data.note,
            address: data.address,
            phone: data.phone,
            companyId: company.id,
            createdById: userId,
            accounts: {
              create: data.accounts
            }
          }
        })
        
        return client
      }
    })
    t.field('deleteClient', {
      type: 'Client',
      args: {
        id: idArg()
      },
      resolve: async (_parent, { id }, context: Context) => {
        return context.prisma.client.delete({
          where: {
            id
          }
        })
      }
    })
    // t.field('updateClient', {
    //   type: 'Client',
    //   args: {
    //     id: idArg(),
    //     data: arg({ type: 'ClientInput' })
    //   },
    //   resolve: async (_parent, { id, data }, context: Context) => {
    //     const userId = getUserId(context)
    //     const existingClient = await context.prisma.client.({
    //       where: {
    //         id,
    //         createdById: userId
    //       }
    //     })

    //     if (!existingClient) {
    //       throw new Error('Client not found')
    //     }

    //     await context.prisma.client.update({
    //       where: {
    //         id
    //       },
    //       data: {
    //         ...data,
    //         accounts: data

    //       }
    //     })
        
    //     return client
    //   }
    // })

    // #endregion

  
// //#region client api
//     t.field('createClient', {
//       type: 'Client',
//       args: {
//         data: arg({ type: 'ClientInput' }),
//         companyId: idArg()
//       },
//       resolve: async (_parent, { companyId, data }, context) => {
//         // todo: check for company ownership
//         const client = await context.prisma.client.create({
//           data
//         })
//         await context.prisma.company.update({
//           where: {
//             id: companyId
//           },
//           data: {
//             clients: {
//               connect: {
//                 id: client.id
//               }
//             }
//           }
//         })
        
//         return client
//       }
//     })

//     t.field('updateClient', {
//       type: 'Client',
//       args: {
//         data: arg({ type: 'ClientInput' }),
//         clientId: idArg()
//       },
//       resolve: async (_parent, { clientId, data }, context) => {
//         return await context.prisma.client.update({
//           where: {
//             id: clientId
//           },
//           data
//         })
//       }
//     })


//     t.field('deleteClient', {
//       type: 'Client',
//       args: {
//         clientId: idArg(),
//         companyId: idArg()
//       },
//       resolve: async (_parent, { companyId, clientId }, context) => {
//         return context.prisma.company.update({
//           where: {
//             id: companyId
//           },
//           data: {
//             clients: {
//               delete: {
//                 id: clientId
//               }
//             }
//           }
//         })
//       }
//     })
// //#endregion

// //#region invoice api
//   t.field('createInvoice', {
//     type: 'Invoice',
//     args: {
//       data: arg({ type: 'InvoiceInput' })
//     },
//     resolve: async (_parent, { data }: { data: IDocInput }, context) => {
//       const invoice = await context.prisma.invoice.create({
//         data: {
//           company: {
//             connect: {
//               id: data.companyId
//             }
//           },
//           client: {
//             connect: {
//               id: data.clientId
//             }
//           },
//           account: {
//             connect: {
//               id: data.accountId
//             }
//           },
//           draft: true,
//           date: data.date,
//           productLine: {
//             create: data.productLine.map(v => ({
//               product: {
//                 connect: {
//                   id: v.product
//                 }
//               },
//               qty: v.qty
//             }))
//           }
//         }
//       })

//       return invoice
//     }
//   })
// //#endregion

// //#region company api
//     t.field('createCompany', {
//       type: 'Company',
//       args: {
//         data: arg({ type: 'CompanyInput' })
//       },
//       resolve: async (_parent, { data }: { data: ICompanyInput }, context) => {
//         const userId = getUserId(context)
//         const company = await context.prisma.company.create({
//           data: {
//             name: data.name,
//             user: {
//               connect: {
//                 id: userId
//               }
//             },
//             stamp: 'not implemented',
//             accounts: {
//               create: data.accounts
//             }
//           }
//         })

//         return company
//       }
//     })
  }
//#endregion
})
