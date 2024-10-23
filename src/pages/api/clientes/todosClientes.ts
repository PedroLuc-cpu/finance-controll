import { Clientes } from "@/model/clientes";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Clientes[] | { message: string }>,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return res.json([
      {
        id: "1",
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: ["989911213123", "1312312312312"],
        endereco: [
          {
            rua: "Rua das Flores",
            numero: "123",
            bairro: "Jardim das Acácias",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01234-567",
          },
        ],
        boletos: [
          {
            id: "101",
            valor: 150.75,
            vencimento: "2024-10-25",
            status: "em aberto",
          },
          {
            id: "102",
            valor: 200.5,
            vencimento: "2024-09-15",
            status: "vencido",
          },
          {
            id: "103",
            valor: 300.5,
            vencimento: "2024-09-15",
            status: "vencido",
          },
        ],
        status: "active",
      },
    ]);
  } else {
    res.send({
      message:
        "Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
    });
  }
}
