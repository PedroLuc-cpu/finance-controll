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
    const marcas = await prisma.marca.findMany();
    if (marcas.length < 0) {
      return res.status(404).json({ message: "Nenhuma marcas cadastrada." });
    }
    return res.json(marcas);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
