import { queryType, nonNull, idArg, inputObjectType } from '@nexus/schema'
import { Context } from 'src/context'
import { getUserId } from '../utils'

export const QueryInput = inputObjectType({
  name: 'QueryInput',
  definition (t) {
    t.nullable.string('query')
    t.nullable.int('first')
    t.nullable.id('after')
  }
})

export const Query = queryType({
  definition (t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_, arg, ctx) => {
        return ctx.prisma.user.findMany()
      }
    })

    t.field('me', {
      type: 'User',
      resolve: async (_, arg, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findFirst({
          where: {
            id: userId
          }
        })
      }
    })

    t.field('company', {
      type: 'Company',
      resolve: async (_, arg, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
      }
    })

    t.nonNull.list.nonNull.field('clients', {
      type: 'Client',
      resolve: async (_, args, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.client.findMany({
          where: {
            createdById: userId
          }
        })
      }
    })

    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
      resolve: async (_, args, ctx: Context) => {
        const userId = getUserId(ctx)
        const company = await ctx.prisma.company.findFirst({
          where: {
            ownerId: userId
          }
        })
        return ctx.prisma.product.findMany({
          where: {
            companyId: company.id
          }
        })
      }
    })

    t.field('product', {
      type: 'Product',
      args: {
        id: nonNull(idArg())
      },
      resolve: async (_, { id }, ctx: Context) => {
        return ctx.prisma.product.findFirst({
          where: {
            id
          },
          include: {
            docs: true
          }
        })
      }
    })

    t.field('client', {
      type: 'Client',
      args: {
        id: nonNull(idArg())
      },
      resolve: async (_, { id }, ctx: Context) => {
        return ctx.prisma.client.findFirst({
          where: {
            id
          },
          include: {
            accounts: true,
            docs: true
          }
        })
      }
    })
  }
})
