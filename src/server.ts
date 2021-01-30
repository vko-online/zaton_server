import { GraphQLServer } from 'graphql-yoga'
import createContext from './context'
import schema from './schema'

const server = new GraphQLServer({
  context: createContext,
  schema: schema as any
})

// tslint:disable-next-line: no-floating-promises
server.start(() => {
  console.log('Server ready at http://localhost:4000')
})
