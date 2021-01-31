import { queryType } from '@nexus/schema'
import { Context } from 'src/context'
import { getUserId } from '../utils'

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
      resolve: async (_, arg, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.client.findMany({
          where: {
            createdById: userId
          }
        })
      }
    })

  }
})
