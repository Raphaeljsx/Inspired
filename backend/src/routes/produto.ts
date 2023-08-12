import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  let { search, limit, page, usuario_id } = req.query;

  let parsedPage = Number(page);
  let parsedLimit = Number(limit);

  if (!parsedLimit) {
    parsedLimit = 9;
  }
  if (!parsedPage) {
    parsedPage = 1;
  }

  let skip = (parsedPage - 1) * parsedLimit;

  const produtos = await prisma.produto.findMany({
    where: {
      usuario_id: usuario_id ? Number(usuario_id) : undefined,
      nome: { contains: search ? String(search) : undefined },
    },
    take: parsedLimit,
    skip: skip,
  });

  const total = await prisma.produto.count();

  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("X-Total-Count", total.toString());

  if (produtos) {
    res.json(produtos);
  } else {
    res.status(404);
  }
});

route.get("/:id", async (req: Request, res: Response) => {
  const produto = await prisma.produto.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(produto);
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
