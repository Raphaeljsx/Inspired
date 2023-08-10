import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

route.post("/", async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.create({
    data: { ...req.body, id: undefined },
  });
  res.json(usuario);
});

route.post("/login", async (req: Request, res: Response) => {
  const usuario = req.body;
  const exist = await prisma.usuario.findFirst({
    where: {
      email: usuario.email,
      senha: usuario.senha,
    },
  });

  if (exist) {
    res.json(exist);
  } else {
    res.status(401);
    res.json(null);
  }
});

route.put("/:id", async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.update({
    where: { id: req.body.id },
    data: { ...req.body },
  });
  res.json(usuario);
});

export default route;
