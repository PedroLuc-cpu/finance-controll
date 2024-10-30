import { Produto } from "@/model/produtos";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Método não permitido. Use o método POST." });
  }
  try {
    const produtos = await prisma.produto.findMany();
    if (produtos.length < 0) {
      return res.status(404).json({ message: "Nenhum Produto cadastrado." });
    }
    return res.json(produtos);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
