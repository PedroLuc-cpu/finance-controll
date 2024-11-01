import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Método não permitido. Use o método POST." });
  }

  try {
    const { categoria } = req.body;

    // Validação mínima de campos obrigatórios
    if (!categoria) {
      return res.status(400).json({
        error: "Os campo categoria é obrigatório.",
      });
    }

    const marcas = await prisma.categoria.create({
      data: {
        categoria: categoria,
      },
    });

    return res.status(201).json(marcas);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return res.status(500).json({
      error:
        "Ocorreu um erro ao criar a categoria. Tente novamente mais tarde.",
    });
  }
}
