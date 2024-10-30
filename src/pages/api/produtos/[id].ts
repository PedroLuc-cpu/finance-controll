import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const id = req.query.id as string;

  if (session) {
    if (req.method === "GET") {
      const produto = prisma.produto.findUnique({
        where: { id: id },
      });

      if (!id) {
        return res.status(200).json(produto);
      } else {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
    } else {
      return res.status(405).json({ message: "Método não permitido" });
    }
  } else {
    res.send({
      message:
        "Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
    });
  }
}
