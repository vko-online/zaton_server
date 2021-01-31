import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema } from 'nexus'
import * as types from './types'

export default makeSchema({
  types,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  }
})
