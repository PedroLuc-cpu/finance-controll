import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
		const { nome, cnpj, endereco, telefone } = req.body;

		// Validação mínima de campos obrigatórios
		if (!nome || !cnpj || !endereco || !telefone) {
			return res.status(400).json({
				error:
					"Os campos nome, descricao, categoria, codigoBarras e marca são obrigatórios.",
			});
		}

		const produto = await prisma.fornecedor.create({
			data: {
				nome: nome,
				cnpj: cnpj,
				endereco: endereco,
				telefone: telefone,
			},
		});
		return res.status(201).json(produto);
	} catch (error) {
		console.error("Erro ao criar produto:", error);
		return res.status(500).json({
			error: "Ocorreu um erro ao criar o produto. Tente novamente mais tarde.",
		});
	}
}
