import { Router, Request, Response } from 'express'
import { prisma } from '../database'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
  const transacao = await prisma.transacao.findMany()
  res.json(transacao)
})

export default route