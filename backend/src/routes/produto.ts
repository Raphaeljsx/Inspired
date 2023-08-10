import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const usuario_id = req.query.usuario_id;

  const produtos = await prisma.produto.findMany({
    where: { usuario_id: usuario_id ? Number(usuario_id) : undefined },
  });
  console.log(usuario_id);

  res.json(produtos);
});

route.post("/", async (req: Request, res: Response) => {
  const produto = await prisma.produto.create({
    data: { ...req.body, id: undefined, preco: req.body.preco.toString() },
  });
  res.json(produto);
});

route.delete("/:id", async (req: Request, res: Response) => {
  const produto = await prisma.produto.delete({
    where: { id: Number(req.params.id) },
  });
  res.json(produto);
});

export default route;
