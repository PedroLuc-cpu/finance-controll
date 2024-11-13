import { prisma } from "@/prisma";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface IPayload {
  sub: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token ausente" });
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "c10a1f8f263acdffbb48fe894fca4b43"
    ) as IPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    (req as any).user = {
      id: user.id,
    };
    return res
      .status(200)
      .json({ message: "Autenticação realizada com sucesso" });
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
