import { queryType } from '@nexus/schema'

export const Query = queryType({
  definition (t) {
    t.field('users', {
      type: 'User',
      list: true,
      resolve: async (_, arg, ctx) => {
        return ctx.prisma.user.findMany()
      }
    })
  }
})
