import express from "express";
import { prisma } from "./database";
import cors from "cors";
import usuarioRoute from "./routes/usuario";
import produtoRoute from "./routes/produto";
import transacaoRoute from "./routes/transacao";

import { Router, Request, Response } from "express";

const app = express();
const route = Router();
const port = 3333;

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "*" }));

route.get("/", async (req: Request, res: Response) => {
  res.json("Backend funcionando");
});

app.use("/", route);
app.use("/produto", produtoRoute);
app.use("/transacao", transacaoRoute);
app.use("/usuario", usuarioRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
