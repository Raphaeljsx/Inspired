import { Router, Request, Response } from "express";
import { prisma } from "../database";

const route = Router();
const jwt = require("jsonwebtoken");
const { AuthMiddleware } = require("../../middlewares/auth.js");

route.get("/", async (req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

route.post("/", async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.create({
    data: { ...req.body, id: undefined, token: undefined },
  });

  const token = jwt.sign(usuario, process.env.SECRET, { expiresIn: "1h" });

  res.json({ ...usuario, token });
});

route.post("/login", async (req: Request, res: Response) => {
  const usuario = req.body;
  const exist = await prisma.usuario.findFirst({
    where: {
      email: usuario.email,
      senha: usuario.senha,
    },
  });

  const token = jwt.sign(usuario, process.env.SECRET, { expiresIn: "1h" });

  if (exist) {
    res.json({ ...exist, token, senha: undefined });
  } else {
    res.status(401);
    res.json(null);
  }
});

route.put("/:id", AuthMiddleware, async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.update({
    where: { id: req.body.id },
    data: { ...req.body, id: undefined },
  });
  res.json(usuario);
});

export default route;
