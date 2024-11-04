import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions);

	if (session) {
		res.send({
			content:
				"Este é um conteúdo protegido. Você pode acessar este conteúdo porque está conectado.",
		});
	} else {
		res.send({
			error:
				"Você deve estar conectado para visualizar o conteúdo protegido nesta página.",
		});
	}
};
