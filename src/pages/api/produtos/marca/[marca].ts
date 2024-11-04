import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);

	const categorias = req.query.marca as string;

	if (session) {
		if (req.method === "GET") {
			const categoria = await prisma.categoria.findMany({
				where: {
					categoria: {
						contains: categorias,
					},
				},
			});

			if (categoria.length > 0) {
				return res.status(200).json(categoria);
			}
			return res.status(404).json({ message: "Categoria não encontrada" });
		}
		return res.status(405).json({ message: "Método não permitido" });
	}
	res.status(401).json({
		message:
			"Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
	});
}
