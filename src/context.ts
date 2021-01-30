import { Request } from 'express'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  request: Request
}

export default function createContext (req: ContextParameters) {
  return {
    ...req,
    prisma
  }
}
