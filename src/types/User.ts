import { inputObjectType, objectType } from '@nexus/schema'

export const SigninInput = inputObjectType({
  name: 'SigninInput',
  definition (t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const SignupInput = inputObjectType({
  name: 'SignupInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const User = objectType({
  name: 'User',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.company()
    t.model.createdAt()
    t.model.updatedAt()
  }
})
