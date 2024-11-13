import { prisma } from "@/prisma";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Método não suportado" });
  }

  const { email, resetCode, newPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (
    !user ||
    user.passwordResetCode !== resetCode ||
    !user.passwordResetExpires ||
    user.passwordResetExpires < new Date()
  ) {
    return res.status(400).json({ message: "Código inválido ou expirado." });
  }
  const hashedPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      passwordResetCode: "",
      passwordResetExpires: null,
    },
  });

  res.status(200).json({ message: "Senha redefinida com sucesso." });
}
