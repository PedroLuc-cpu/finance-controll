import { Clientes } from "@/model/clientes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Clientes[]>
) {
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
    {
      id: "2",
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      telefone: ["11999998888", "12999998888"],
      endereco: [
        {
          rua: "Avenida Central",
          numero: "987",
          bairro: "Centro",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "20000-001",
        },
      ],
      boletos: [
        {
          id: "103",
          valor: 300.75,
          vencimento: "2024-11-05",
          status: "em aberto",
        },
        {
          id: "104",
          valor: 450.0,
          vencimento: "2024-08-10",
          status: "pago",
        },
      ],
      status: "active",
    },
    {
      id: "3",
      nome: "Carlos Pereira",
      email: "carlos.pereira@email.com",
      telefone: ["21888887777", "21999996666"],
      endereco: [
        {
          rua: "Rua Verde",
          numero: "456",
          bairro: "Vila das Palmeiras",
          cidade: "Belo Horizonte",
          estado: "MG",
          cep: "31000-000",
        },
      ],
      boletos: [
        {
          id: "105",
          valor: 100.5,
          vencimento: "2024-09-30",
          status: "vencido",
        },
      ],
      status: "inactive",
    },
    {
      id: "4",
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      telefone: ["13912345678"],
      endereco: [
        {
          rua: "Rua das Orquídeas",
          numero: "321",
          bairro: "Jardim Imperial",
          cidade: "Santos",
          estado: "SP",
          cep: "11000-123",
        },
      ],
      boletos: [
        {
          id: "106",
          valor: 750.25,
          vencimento: "2024-12-01",
          status: "em aberto",
        },
      ],
      status: "active",
    },
    {
      id: "5",
      nome: "Pedro Alves",
      email: "pedro.alves@email.com",
      telefone: ["11987654321"],
      endereco: [
        {
          rua: "Rua do Sol",
          numero: "456",
          bairro: "Vila Nova",
          cidade: "Curitiba",
          estado: "PR",
          cep: "80000-456",
        },
      ],
      boletos: [
        {
          id: "107",
          valor: 220.75,
          vencimento: "2024-11-15",
          status: "em aberto",
        },
        {
          id: "108",
          valor: 180.4,
          vencimento: "2024-10-01",
          status: "pago",
        },
      ],
      status: "active",
    },
    {
      id: "6",
      nome: "Paulo Souza",
      email: "paulo.souza@email.com",
      telefone: ["21965432109", "21345678901"],
      endereco: [
        {
          rua: "Rua da Paz",
          numero: "789",
          bairro: "Liberdade",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "23000-789",
        },
      ],
      boletos: [
        {
          id: "109",
          valor: 500.0,
          vencimento: "2024-08-20",
          status: "vencido",
        },
      ],
      status: "inactive",
    },
    {
      id: "7",
      nome: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      telefone: ["17987654321"],
      endereco: [
        {
          rua: "Rua Primavera",
          numero: "100",
          bairro: "Centro",
          cidade: "São José do Rio Preto",
          estado: "SP",
          cep: "15000-100",
        },
      ],
      boletos: [
        {
          id: "110",
          valor: 320.25,
          vencimento: "2024-07-10",
          status: "pago",
        },
      ],
      status: "active",
    },
    {
      id: "8",
      nome: "Bruno Nascimento",
      email: "bruno.nascimento@email.com",
      telefone: ["21987654321"],
      endereco: [
        {
          rua: "Rua Azul",
          numero: "200",
          bairro: "Jardim Oceano",
          cidade: "Niterói",
          estado: "RJ",
          cep: "24000-200",
        },
      ],
      boletos: [
        {
          id: "111",
          valor: 400.75,
          vencimento: "2024-10-15",
          status: "em aberto",
        },
      ],
      status: "active",
    },
    {
      id: "9",
      nome: "Gabriela Santos",
      email: "gabriela.santos@email.com",
      telefone: ["21912345678"],
      endereco: [
        {
          rua: "Rua da Alegria",
          numero: "300",
          bairro: "Vila Esperança",
          cidade: "Belo Horizonte",
          estado: "MG",
          cep: "30000-300",
        },
      ],
      boletos: [
        {
          id: "112",
          valor: 270.0,
          vencimento: "2024-09-10",
          status: "vencido",
        },
      ],
      status: "inactive",
    },
    {
      id: "10",
      nome: "Lucas Carvalho",
      email: "lucas.carvalho@email.com",
      telefone: ["31912345678"],
      endereco: [
        {
          rua: "Rua das Palmeiras",
          numero: "50",
          bairro: "São Lucas",
          cidade: "Belo Horizonte",
          estado: "MG",
          cep: "30500-050",
        },
      ],
      boletos: [
        {
          id: "113",
          valor: 550.5,
          vencimento: "2024-11-20",
          status: "em aberto",
        },
      ],
      status: "active",
    },
  ]);
}
