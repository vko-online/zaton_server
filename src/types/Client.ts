import { objectType, inputObjectType } from '@nexus/schema'

export const ClientInput = inputObjectType({
  name: 'ClientInput',
  definition (t) {
    t.string('bin', { required: false })
    t.string('name', { required: true })
    t.int('type', { required: false })
    t.string('legalAddress', { required: false })
    t.string('actualAddress', { required: false })
    t.string('phone', { required: false })
    t.string('email', { required: false })
    t.string('position', { required: false })
    t.string('director', { required: false })
    t.string('note', { required: false })
  }
})

export const Client = objectType({
  name: 'Client',
  definition (t) {
    t.model.id()
    t.model.bin()
    t.model.name()
    t.model.type()
    t.model.legalAddress()
    t.model.actualAddress()
    t.model.phone()
    t.model.email()
    t.model.position()
    t.model.director()
    t.model.note()
    t.model.invoices({ type: 'Invoice' })
  }
})
