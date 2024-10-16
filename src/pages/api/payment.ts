import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma";

interface Payment {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Payment | { message: string }>
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ message: "ID do pagamento é obrigatório." });
    }

    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: id,
        },
      });

      if (!payment) {
        return res.status(404).json({ message: "pagamento não encontrado" });
      }

      return res.status(200).json({
        id: payment.id,
        description: payment.description,
        amount: payment.amount,
        type: payment.type,
        date: payment.created_at,
      });
    } catch (error) {
      console.error("Erro ao buscar pagamento:", error);
      return res.status(500).json({ message: "Erro ao buscar pagamento" });
    }
  } else {
    return res.status(405).json({
      message: "Método não permitido. use GET.",
    });
  }
}
