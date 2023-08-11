import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const comprador_id = req.query.comprador_id;
  const vendedor_id = req.query.vendedor_id;

  let transacoes = await prisma.transacao.findMany({
    where: {
      comprador_id: comprador_id ? Number(comprador_id) : undefined,
      vendedor_id: vendedor_id ? Number(vendedor_id) : undefined,
    },
    include: { produto: true, comprador: true, vendedor: true },
  });

  transacoes = transacoes.map((t) => ({
    ...t,
    endereco: {
      cep: t.cep,
      rua: t.rua,
      numero: t.numero,
      estado: t.estado,
      bairro: t.bairro,
      cidade: t.cidade,
    },
  }));

  res.json(transacoes);
});

route.post("/", async (req: Request, res: Response) => {
  const transacao = await prisma.transacao.create({
    data: { ...req.body, id: undefined },
  });
  res.json(transacao);
});

export default route;
