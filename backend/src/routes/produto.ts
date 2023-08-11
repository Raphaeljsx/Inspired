import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  let { search, limit, page, usuario_id } = req.query;

  const produtosAll = await prisma.produto.findMany();

  if (!page) {
    page = "0";
  }

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const skip = (parsedPage - 1) * parsedLimit;

  const produtos = await prisma.produto.findMany({
    where: {
      usuario_id: usuario_id ? Number(usuario_id) : undefined,
      nome: { contains: search ? String(search) : undefined },
    },
    take: Number(limit),
    skip: skip,
  });

  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("X-Total-Count", produtosAll.length.toString());

  if (produtos) {
    res.json(produtos);
  } else {
    res.status(404);
  }
});

//TODO:Fazer a paginação no banco
// route.get("/search", async (req: Request, res: Response) => {
//   let { search, limit, _page, usuario_id } = req.query;

//   const produtosAll = await prisma.produto.findMany();

//   // if (!_page) {
//   //   _page = "0";
//   // }

//   const produtos = await prisma.produto.findMany({
//     where: {
//       usuario_id: usuario_id ? Number(usuario_id) : undefined,
//       nome: { contains: search ? String(search) : undefined },
//     },
//     take: Number(limit),
//     // skip: Number(_page),
//   });

//   res.set("Access-Control-Expose-Headers", "X-Total-Count");
//   res.set("X-Total-Count", produtosAll.length.toString());

//   console.log(produtosAll.length);

//   if (produtos) {
//     res.json(produtos);
//   } else {
//     res.status(404);
//   }
// });

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
