import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);

	const id = req.query.id as string;

	if (session) {
		if (req.method === "GET") {
			if (!id) {
				return res.status(400).json({ message: "ID do produto não fornecido" });
			}

			const produto = await prisma.produto.findUnique({
				where: { id: id },
			});

			if (produto) {
				return res.status(200).json(produto);
			}
			return res.status(404).json({ message: "Produto não encontrado" });
		}
		return res.status(405).json({ message: "Método não permitido" });
	}
	res.status(401).json({
		message:
			"Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
	});
}
