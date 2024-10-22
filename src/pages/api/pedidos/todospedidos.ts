import { Pedidos } from "@/model/pedidos";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pedidos[] | { menssage: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return res.json([
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Recusado",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
          id: "1",
          nome: "Alícia Brito",
          email: "AlíciaBrito@email.com",
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
          id: "1",
          nome: "Pedro Lucas",
          email: "Pedro Lucas@email.com",
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Recusado",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Recusado",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Recusado",
        data: "2023-06-23",
        quantia: 250,
      },
      {
        cliente: {
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
          boletos: [],
          status: "active",
        },
        tipo: "Oferta",
        status: "Cumprido",
        data: "2023-06-23",
        quantia: 250,
      },
    ]);
  } else {
    res.send({
      menssage:
        "Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
    });
  }
}
