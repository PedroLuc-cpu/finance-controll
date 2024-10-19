import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    // Buscar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Retornar o token para o cliente
    return res.status(200).json({
      message: "Login bem-sucedido",
      token,
    });
  } catch (error) {
    console.error("Erro ao tentar logar o usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}