import { Produto } from "@/model/produtos";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Produto[]>
) {
  return res.json([
    {
      id: 1,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      name: "Produto Exemplo",
      description: "Descrição do produto exemplo.",
      price: 99.99,
      category: "Categoria Exemplo",
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
