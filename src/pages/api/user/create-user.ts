import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { name, email, password, confirmedPassword, isNotification, image } =
      req.body;

    // Validação básica
    if (!email || !password || !confirmedPassword) {
      return res
        .status(400)
        .json({ message: "Email e senhas são obrigatórios" });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "As senhas não coincidem" });
    }

    try {
      // Verifica se o email já está registrado
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email já está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // Idealmente, você deve hashear a senha antes de salvar no banco
          confirmedPassword: hashedPassword, // Por razões de segurança, isso não deve ser salvo; apenas para validação no código
          isNotification: isNotification ?? "off",
          image,
        },
      });

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Método ${req.method} não permitido` });
  }
}
