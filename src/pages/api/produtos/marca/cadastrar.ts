import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ error: "Método não permitido. Use o método POST." });
	}

	try {
		const { marca } = req.body;

		// Validação mínima de campos obrigatórios
		if (!marca) {
			return res.status(400).json({
				error: "Os campo marca é obrigatório.",
			});
		}

		const marcas = await prisma.marca.create({
			data: {
				marca: marca,
			},
		});

		return res.status(201).json(marcas);
	} catch (error) {
		console.error("Erro ao criar categoria:", error);
		return res.status(500).json({
			error: "Ocorreu um erro ao criar a marca. Tente novamente mais tarde.",
		});
	}
}
