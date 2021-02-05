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

    t.list.field('clients', {
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

    t.field('client', {
      type: 'Client',
      args: {
        id: nonNull(idArg())
      },
      resolve: async (_, { id }, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.client.findFirst({
          where: {
            id,
            createdById: userId
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
