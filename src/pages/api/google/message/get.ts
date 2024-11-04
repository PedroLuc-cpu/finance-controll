import { getGoogleAuthToken } from "@/lib/google";
import { gmail_v1, google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Mails } from "@/model/email";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Mails[] | { message: string }>,
) {
	try {
		const session = await getServerSession(req, res, authOptions);
		if (!session) return res.status(401).json({ message: "Unauthorized" });

		const user = await prisma.user.findUnique({
			where: { name: session.user.name as string },
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		const gmail = google.gmail({
			version: "v1",
			auth: await getGoogleAuthToken(user.id),
		});

		const messagesResponse = await gmail.users.messages.list({
			userId: "me",
			maxResults: 10,
		});

		const messages = messagesResponse.data.messages;
		if (!messages || messages.length === 0) {
			return res.status(200).json({ message: "No messages found in inbox." });
		}

		const parseMessage = (message: gmail_v1.Schema$Message): Mails => {
			const header = message.payload?.headers || [];
			const getHeader = (name: string) =>
				header.find((header) => header.name === name)?.value || "";
			return {
				id: message.id || "",
				name: getHeader("From").split(" <")[0],
				email: getHeader("From").split(" <")[1]?.replace(">", "") || "",
				subject: getHeader("Subject"),
				text: message.snippet || "",
				date: getHeader("Date"),
				read: message.labelIds?.includes("UNREAD") === false,
				labels: message.labelIds || [],
			};
		};

		// Obter o conteúdo de cada mensagem
		const messagesData: Mails[] = await Promise.all(
			messages.map(async (msg) => {
				const message = await gmail.users.messages.get({
					userId: "me",
					id: msg.id as string,
				});
				return parseMessage(message.data);
			}),
		);

		res.status(200).json(messagesData);
	} catch (error) {
		console.error("Erro de permissão:", error);
		res.status(403).json({ message: "Permissão insuficiente" });
	}
}
