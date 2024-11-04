import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/prisma";

const UpdateProfileBody = z.object({
	avatar_url: z.string().url().nullable(),
	username: z.string().nullable(),
	date_nas: z.date().nullable(),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "PUT") {
		res.status(404).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).end();
	}

	const { avatar_url, username } = UpdateProfileBody.parse(req.body);
	await prisma.user.update({
		where: {
			id: session.user.id,
		},
		data: {
			image: avatar_url,
			name: username,
		},
	});
	return res.status(204).end();
}
